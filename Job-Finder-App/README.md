# Job Finder App

## Project Overview

The Job Finder App is a comprehensive application designed to facilitate job searching and management. It provides users with functionalities such as job searching, applying for jobs, withdrawing applications, and viewing applied jobs. The application is built using modern web development technologies including React, Next.js, Zustand for state management,Tanstack/React-Query, Axios, and Tailwind CSS for styling.

## Project Structure

The project follows the Atomic Design methodology, organizing components into atoms, molecules, organisms, templates, and pages. This approach ensures modularity and reusability of components.

## Installation

1. Clone the repository:
    ```bash
    git clone <https://github.com/HasanTaspolat/SHFT-FE-case>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env.local` file in the root directory and add the following environment variables:
    ```env
    NEXT_PUBLIC_API_URL=<https://novel-project-ntj8t.ampt.app/api>
    ```

4. Build the project:
    ```bash
    npm run build
    ```

5. Run the development server:
    ```bash
    npm run dev
    ```

```
app
├── components
│   ├── atoms
│   ├── hoc
│   ├── molecules
│   ├── organisms
│   ├── templates
├── context
│   └── AuthContext.tsx
├── features
│   ├── auth
│   ├── list
│   └── fullfill-profile
├── hooks
│   ├── use-toast.ts
│   ├── useAuthStore.ts
│   ├── useClientLoader.tsx
│   ├── useFetchJob.ts
│   ├── useJobStore.ts
├── services
│   ├── auth
│   ├── jobs
│   ├── user
│   └── interceptor.tsx
├── types
├── utils
│   ├── auth.ts
│   ├── AuthActions.ts
│   ├── fetchAndStoreJobs.ts
│   ├── initInterceptor.ts
├── globals.css
├── layout.tsx
├── page.tsx
├── providers.tsx
```

### Folder Purposes

- **components**: This directory contains all the reusable UI components organized based on the Atomic Design principles.
  - **atoms**: The smallest building blocks like buttons, inputs, and icons.
  - **hoc**: Higher Order Components for component logic reuse.
  - **molecules**: Groups of atoms functioning together, like form fields with labels.
  - **organisms**: Complex components combining atoms and molecules, like navigation bars or user cards.
  - **templates**: Page-level components combining organisms to form the skeleton of a page.

- **context**: This directory contains the context API files, like `AuthContext.tsx`, which handle global state management related to user authentication.

- **features**: This directory is used to group related features of the application.
  - **auth**: Contains components and logic related to authentication (login, register).
  - **list**: Contains components and logic related to job listings.
  - **fullfill-profile**: Contains components and logic for completing user profiles.

- **hooks**: Custom hooks are placed here to encapsulate and reuse stateful logic.
  - **use-toast.ts**: Hook for managing toast notifications.
  - **useAuthStore.ts**: Hook for managing authentication state.
  - **useClientLoader.tsx**: Hook for managing client-side loading states.
  - **useFetchJob.ts**: Hook for fetching job data.
  - **useJobStore.ts**: Hook for managing job-related states.

- **services**: This directory contains service files for handling API requests.
  - **auth**: Services related to authentication.
  - **jobs**: Services related to job operations.
  - **user**: Services related to user operations.
  - **interceptor.tsx**: Axios interceptors for handling global request/response logic.

- **types**: TypeScript types and interfaces are defined here for type safety.

- **utils**: Utility functions and helper methods are placed here.
  - **auth.ts**: Utility functions for handling authentication cookies.
  - **AuthActions.ts**: Actions related to authentication.
  - **fetchAndStoreJobs.ts**: Utility function for fetching and storing jobs.
  - **initInterceptor.ts**: Initializes Axios interceptors.

- **store**: This directory contains Zustand store files for global state management.
  - **useLanguageStore.ts**: Zustand store for managing the application's language state.

- **locales**: This directory contains translation files for different languages.
  - **en**: Contains English translations.
  - **tr**: Contains Turkish translations.

- **globals.css**: Global CSS styles.

- **layout.tsx**: Main layout component for the application.

- **page.tsx**: The root page component.

- **providers.tsx**: Provider components for wrapping the application with context providers.

## Key Features

1. **User Authentication**: Users can register, login, and maintain their session using access and refresh tokens.
2. **Job Searching**: Users can search for jobs using various filters and search criteria.
3. **Apply for Jobs**: Users can apply for jobs directly from the application.
4. **Withdraw Applications**: Users can withdraw their job applications.
5. **View Applied Jobs**: Users can view a list of jobs they have applied for.
6. **Localization**: Support for multiple languages (English and Turkish), allowing users to switch languages.

## Pros and Cons of the Design

### Pros

1. **Modularity**: The Atomic Design methodology ensures components are small, reusable, and easy to maintain.
2. **Scalability**: The project structure supports scaling, making it easy to add new features without significant restructuring.
3. **State Management**: Zustand provides a lightweight and flexible state management solution.
4. **User Experience**: The use of modern UI libraries like NextUI,Shadcn and custom components ensures a good user experience.

### Cons

1. **Complexity**: The Atomic Design methodology can introduce complexity, especially for developers unfamiliar with the approach.
2. **Initial Setup**: The setup and configuration of environment variables and state management require careful attention.
3. **Dependency Management**: Managing multiple dependencies and keeping them up-to-date can be challenging.


## Localization System

The localization system allows the application to support multiple languages. It uses translation files for each supported language, a custom translation hook, and Zustand for global state management.

- **Translation Files**: JSON files organized by language codes (`en` for English, `tr` for Turkish), containing key-value pairs for each translatable string.
- **Translation Hook (`useTranslation`)**: Fetches the current language from the global state and retrieves the corresponding translations from the JSON files.
- **Zustand Store**: Manages the global state for the selected language across the application.


## Running Tests

To run the tests for the Job Finder App, follow these steps:

1. Ensure all dependencies are installed:
    ```bash
    npm install
    ```

2. To run Cypress end-to-end tests, use the following commands:
    ```bash
    npx cypress open  # To open the Cypress Test Runner
    npx cypress run   # To run the tests in headless mode
    ```

These commands will execute the test cases defined in Cypress test files.

## Problems
**App Routing**
  - To provide a better routing experience pages routing and /src folder structure should have impelemented
  since project imply more pages it will be complicated to sustain in order to group the folders.
**Global States**
  - In WithdrawJob Zustand states are not working consistently in a single page manner which disrupts the async nature of the project.