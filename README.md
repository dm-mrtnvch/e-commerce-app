# E-Commerce App

This application replicates real-world shopping experiences in a digital environment, offering a comprehensive and interactive online shopping portal. The platform facilitates a seamless journey from product discovery to check out, aimed at enhancing user engagement and boosting purchasing confidence. It’s designed to be responsive, ensuring optimal functionality across various devices.

## Key Features

- **Product Browsing**: Users can explore a wide range of products with detailed descriptions.
- **Shopping Cart**: Users can add items to their basket and easily proceed to checkout.
- **User Authentication**: The application supports user registration and login for a personalized shopping experience.
- **Product Search and Filtering**: Advanced search, categorization, and sorting features streamline the shopping experience.
- **Responsive Design**: Optimized for various devices, ensuring a consistent experience with a minimum resolution of 390px.

## Key Pages

- **Login and Registration Pages**: Secure entry points for user authentication.
- **Main Page**: Central hub linking to all other pages with quick access to products and features.
- **Catalog Product Page**: Displays products in specific categories with interactive cards.
- **Detailed Product Page**: Offers detailed information about each product, allowing users to add items to their basket.
- **User Profile Page**: Allows users to view and edit their personal information.
- **Basket Page**: Users can review and manage their selected products before checkout.
- **About Us Page**: Provides information about the development team and the project.

## Technologies Stack

- [React 18](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Vite](https://vitejs.dev/guide/) to set up a development environment
- [Vitest](https://vitest.dev/guide/) for unit and integration testing
- [ESLint](https://eslint.org/docs/user-guide/getting-started) and [Prettier](https://prettier.io/docs/en/index.html) for code quality
- [Husky](https://typicode.github.io/husky/) for pre-commit hooks
- [CommerceTools](https://docs.commercetools.com/docs/) for cloud-native microservices-based commerce solutions

## System Requirements

- Node.js 16.x or newer
- npm 7.x or newer

## Scripts

The `package.json` file includes several scripts that facilitate development and testing:

- `npm run dev`: Runs the app in the development mode with hot module replacement.
- `npm run build`: Compiles TypeScript files and then builds the application for production.
- `npm run lint`: Runs ESLint to check for code quality issues in the TypeScript and JSX files.
- `npm run lint:fix`: Fixes auto-fixable code quality issues detected by ESLint.
- `npm run format`: Checks the formatting of files using Prettier.
- `npm run format:fix`: Automatically fixes formatting issues using Prettier.
- `npm run preview`: Serves the production build for preview.
- `npm run test`: Runs Vitest tests.

## Setup Instructions

To get the project up and running on your local machine, follow these steps:

1. **Clone the Repository**
   ##### `git clone https://github.com/dm-mrtnvch/e-commerce-app.git`
   ##### `cd e-commerce-app`
2. **Install Dependencies**
   ##### `npm install`   
3. **Run the Development Server**
   ##### `npm run dev`
   This will start the local development server at http://localhost:5173. 
   The app will automatically reload if you make changes to the code.
4. **Running Tests**
   To run the tests, use:
   ##### `npm run test`

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. 
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feat/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the Branch (`git push origin feat/AmazingFeature`)
5. Open a Pull Request to develop branch

## Project Management 
https://code-commandos.atlassian.net/jira/software/projects/KAN/boards/1

## License

Distributed under the MIT License.
