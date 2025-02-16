import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class CronService {
  constructor(private readonly emailService: EmailService) {}

  @Cron(CronExpression.EVERY_10_SECONDS)
  async generateAndSendReport(): Promise<void> {
    const username = process.env.GITHUB_USERNAME || 'devpaulorcc';
    const to = process.env.MAIL_FROM;
    const token = process.env.GITHUB_TOKEN;

    if (!to) {
      console.error('⚠️ E-mail do destinatário não configurado no .env.');
      return;
    }

    if (!token) {
      console.error('⚠️ Token do GitHub não configurado no .env.');
      return;
    }

    const headers = {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    try {
      console.log(
        `🔍 Buscando informações do usuário ${username} no GitHub...`,
      );

      const [userResponse, followersResponse, reposResponse, eventsResponse] =
        await Promise.all([
          axios.get(`https://api.github.com/users/${username}`, { headers }),
          axios.get(`https://api.github.com/users/${username}/followers`, {
            headers,
          }),
          axios.get(`https://api.github.com/users/${username}/repos`, {
            headers,
          }),
          axios.get(`https://api.github.com/users/${username}/events`, {
            headers,
          }),
        ]);

      console.log(`✅ Usuário encontrado: ${userResponse.data.login}`);

      const followersList = followersResponse.data.map((f) => f.login);
      const reposList = reposResponse.data.map((repo) => repo.name);

      console.log(
        `📌 ${followersList.length} seguidores e ${reposList.length} repositórios encontrados.`,
      );

      let totalCommits = 0;
      const sinceDate = new Date();
      sinceDate.setDate(sinceDate.getDate() - 7);
      const since = sinceDate.toISOString();

      console.log(`🔄 Buscando commits desde ${since}...`);

      await Promise.all(
        reposList.map(async (repo) => {
          try {
            const commitsResponse = await axios.get(
              `https://api.github.com/repos/${username}/${repo}/commits?since=${since}`,
              { headers },
            );
            totalCommits += commitsResponse.data.length;
          } catch (error) {
            console.warn(
              `⚠️ Erro ao buscar commits do repositório ${repo}: ${error.response?.status || error.message}`,
            );
          }
        }),
      );

      console.log(`📊 Total de commits na última semana: ${totalCommits}`);

      const emailBody = `
📊 *Relatório de Atividades do GitHub* 📊

👤 Usuário: ${userResponse.data.login}  
🛡 Nome: ${userResponse.data.name || 'Nome não disponível'}  
👥 Seguidores: ${userResponse.data.followers || 0}  
📂 Repositórios Públicos: ${userResponse.data.public_repos || 0}  
📅 Total de Commits na Última Semana: ${totalCommits}  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📌 Repositórios:  
${reposList.length > 0 ? reposList.map((repo) => `- ${repo}`).join('\n') : 'Nenhum encontrado'}  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📌 Últimas Atividades:  
${
  eventsResponse.data.length > 0
    ? eventsResponse.data
        .slice(0, 5)
        .map(
          (event) =>
            `- ${event.type} em ${event.repo.name} (${event.created_at.replace('T', ' ').replace('Z', '')})`,
        )
        .join('\n')
    : 'Nenhuma atividade recente'
}  

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🚀 Gerado automaticamente pelo sistema GithubDataReporter.  
      `;

      console.log(`📩 Enviando relatório para ${to}...`);

      await this.emailService.sendEmail(
        to,
        `📊 Relatório de Atividades do GitHub - ${username}`,
        emailBody,
      );

      console.log(`✅ Relatório enviado com sucesso para ${to}!`);
    } catch (error) {
      console.error(`❌ Erro ao gerar e enviar relatório: ${error.message}`);
    }
  }
}
