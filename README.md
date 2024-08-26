# Transcript Pro

## Overview

The **Transcript Annotation Service** is a web-based application designed to help users add comments at specific points within conversation transcripts, typically between a salesperson and a customer. Additionally, the service features a feedback summary tool that uses OpenAI's GPT-3.5-turbo model to provide salespeople with valuable insights and suggestions, enabling them to enhance their sales skills and overall performance.

## Features

- **Transcript Annotation:**  
  Easily add comments at specific points in a conversation transcript, enabling detailed analysis and feedback on particular parts of the conversation.

- **Feedback Summary:**  
  Generate insightful feedback summaries using OpenAI's GPT-3.5-turbo model. These summaries provide actionable advice for improving sales techniques and communication skills.

## Technology Stack

- **Frontend:** [Next.js](https://nextjs.org/) for a fast and scalable user interface with server-side rendering capabilities.
- **Styling:** [NextUI](https://nextui.org/) for modern React components and [Tailwind CSS](https://tailwindcss.com/) for flexible and responsive design.
- **Database:** [AWS DynamoDB](https://aws.amazon.com/dynamodb/) to store and manage transcript data and annotations, ensuring scalability and reliability.
- **AI Integration:** [OpenAI](https://openai.com/) API using the GPT-3.5-turbo model for generating intelligent feedback.
- **Deployment:** Hosted on [Vercel](https://vercel.com/) for smooth deployment and continuous integration.

## Installation

To run this project locally, follow these steps:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/amitnoelasu/transcript-pro.git
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables:**

    Create a `.env.local` file in the root directory and add the necessary environment variables:

    ```env
    OPENAI_API_KEY=your_openai_api_key
    AWS_ACCESS_KEY_ID=your_aws_access_key_id
    AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
    AWS_REGION=your_aws_region
    ```

4. **Run the Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. **Annotating Transcripts:**  
   Upload or paste a conversation transcript, then add comments at specific points to provide detailed feedback.

2. **Generating Feedback Summaries:**  
   Use the feedback summary feature to get AI-generated insights. Review the summary to identify areas for improvement in the sales conversation.

## Deployment

This project is deployed using Vercel. To deploy your own instance:

1. Push your code changes to your GitHub repository.
2. Connect the GitHub repository to your Vercel account.
3. Configure your environment variables in the Vercel dashboard.
4. Deploy the project. Vercel will handle the rest.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Make your changes and commit them with a clear and descriptive message.
4. Push your changes to your forked repository.
5. Create a pull request against the `main` branch of this repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Acknowledgements

- Special thanks to [OpenAI](https://openai.com/) for providing the GPT-3.5-turbo model.
- Thanks to [NextUI](https://nextui.org/) and [Tailwind CSS](https://tailwindcss.com/) for their excellent UI frameworks.
- Thanks to [Vercel](https://vercel.com/) for providing a seamless deployment platform.

---

Feel free to reach out if you have any questions or need support!
