# Xalaxians Encounter Hackathon

This is a basic Node.js application that's designed to generate datasets as a support for the Xalaxians Encounter Hackathon challenge.

## Features

- Generate datasets for hackathon challenges.
- Use OpenAI's integration to enhance the datasets.
- Generate PDFs using the `pdfkit` library.

## Setup

### Requirements

- Node.js
- npm or Yarn

### Installation

1. Clone the repository to your local machine.

    ```bash
    git clone https://github.com/acastillo9/xalaxians-encounter-hackathon.git
    cd xalaxians-encounter-hackathon
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

    Or if you're using Yarn:

    ```bash
    yarn install
    ```

### Configuration

Create a `.env` file in the root of the project directory and provide the necessary environment variables. For example:

    ```env
    OPENAI_API_KEY=YOUR_OPENAI_API_KEY
    # Add any other necessary environment variables
    ```

## Usage

To start the application:

    ```bash
    npm start
    ```

Or if you're using Yarn:

    ```bash
    yarn start
    ```

This will run the application as specified in the `src/index.js` file.

## Testing

Currently, no tests have been specified for the application. Running the test script will display an error message.

    ```bash
    npm test
    ```

Or if you're using Yarn:

    ```bash
    yarn test
    ```

## Dependencies

- **dotenv**: Used for managing environment variables from `.env` files.
- **openai**: Enables integration with the OpenAI platform for enhanced data operations.
- **pdfkit**: Allows for the creation of PDFs within the application.

## License

This project is licensed under the ISC License.

## Author

- **Andrés Castillo**

## Contributing

Feel free to open issues, send pull requests or drop any feedback to the author.
