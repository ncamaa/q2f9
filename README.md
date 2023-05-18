# 💫 Quasar v2 + 🔥 Firebase v9

This is a full-stack boilerplate, leveraging the power of Quasar v2, Firebase v9 (including Firebase Functions), Typescript, and Vite.

## 📦 Install the Dependencies

Use the following commands to install necessary dependencies:

```bash
yarn
# or
npm install
```

### 🔧 Start the App in Development Mode (hot-code reloading, error reporting, etc.)

To start the app in development mode, run the following command:

```bash
quasar dev
```

### 🕵️‍♂️ Lint the Files

Keep your code tidy and consistent by running:

```bash
yarn lint
# or
npm run lint
```

### 🎨 Format the Files

Ensure your files are formatted correctly by using:

```bash
yarn format
# or
npm run format
```

### 🏗️ Build the App for Production

Prepare your app for deployment with this command:

```bash
quasar build
```

### ⚙️ Customize the Configuration

For customizing your configuration, refer to [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

## 🖥️ Backend

### 📚 Before You Begin

It's advisable to learn more about the Firebase Emulator Suite and Firebase Functions before proceeding. Refer to [Introduction to Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) and [Use TypeScript for Cloud Functions](https://firebase.google.com/docs/functions/typescript).

### 🚀 Getting Started

To initiate a local backend server emulator that includes Firebase Authentication, Firestore, Firebase Storage, and Firebase Functions, you need to first install the Firebase CLI. If it's not installed, run the following command:

```bash
npm install -g firebase-tools
# or
yarn global add firebase-tools
```

Next, log into Firebase. Run this command and follow the prompts:

```bash
firebase login
```

Then, initialize your Firebase project. Make sure you're in the root directory of your project and run:

```bash
firebase init
```

During the setup process, remember to select Firestore, Functions, Storage, and Authentication.

After the initialization, start your local backend server emulator:

```bash
firebase emulators:start
```

This starts a local emulator for Firestore, Firebase Authentication, Firebase Storage, and Firebase Functions.

Don't forget to replace the Firebase configuration object in your app with your Firebase project's configuration object, which you can find in the Firebase Console under Project Settings.

### 🚀 Deploy to Firebase

Before deploying your app to Firebase Hosting, build it for production as shown above:

```bash
quasar build
```

Next, deploy it using the Firebase CLI:

```bash
firebase deploy
```

This command deploys your app as well as any Firebase Functions you've written.

**Note**: Before deploying, make sure you've run `firebase init` and selected "Hosting" during the setup process.

## 🤝 Contributing

We warmly welcome pull requests and issues, whether they're for adding a feature or reporting a bug. Please ensure you follow our contributing guidelines.

## 📝 License

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.
