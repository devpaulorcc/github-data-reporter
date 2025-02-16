<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# 🚀 GitHub Data Reporter

## 📌 Description

The **GitHub Data Reporter** is an application developed with the [NestJS](https://nestjs.com/) framework that collects and generates detailed reports on GitHub repositories. It allows users to gain valuable insights into the activity and performance of their GitHub-hosted projects.

## 🎯 Features

- 📊 **Data Collection**: Extracts relevant information from GitHub repositories, such as total commits per week, total repositories, overall activities, and more.
- 📑 **Report Generation**: Creates comprehensive reports in user-friendly formats, making it easier to analyze and share the collected information.
- ⏰ **Continuous Monitoring**: Every **Friday at 8:00 PM**, a new report will be sent to the registered email.

## ✅ Prerequisites

Before starting, make sure you have the following installed on your machine:

- 🟢 [Node.js](https://nodejs.org/) (version 14 or higher)
- 📦 [npm](https://www.npmjs.com/) (Node.js package manager)

## 🛠 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/devpaulorcc/github-data-reporter.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd github-data-reporter
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

## ⚙️ Configuration

Before running the application, you need to configure the environment variables:

1. **Create a `.env` file** in the root directory of the project, based on the provided `.env-example` file.

2. **Set the following variables** in the `.env` file:

   ```env
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USER=email@email.com
   MAIL_PASS=xxxx xxxx xxxx xxxx
   MAIL_FROM=email-from
   GITHUB_TOKEN=your_github_token
   ```

   - 🔑 `GITHUB_TOKEN`: Your personal GitHub access token. You can generate a new token in the [GitHub Developer Settings](https://github.com/settings/tokens).

## 🚀 Usage

To start the application, use the following command:

```bash
npm run start
```

The application will run in development mode. For other execution modes:

- 🛠 **Development mode with hot-reload**:

  ```bash
  npm run start:dev
  ```

- 🚀 **Production mode**:

  ```bash
  npm run start:prod
  ```

## 🤝 Contributing

Contributions are welcome! If you want to improve this project, follow these steps:

1. **Fork this repository**.

2. **Create a new branch** for your feature or fix:

   ```bash
   git checkout -b my-new-feature
   ```

3. **Commit your changes**:

   ```bash
   git commit -m 'feat: add new functionality'
   ```

4. **Push to the remote repository**:

   ```bash
   git push origin my-new-feature
   ```

5. **Open a Pull Request** detailing your changes.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---
