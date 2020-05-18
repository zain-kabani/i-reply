# I-Reply

## Inspiration

Remembered an episode of Silicon Valley where Gilfoyle created a realistic AI to continue conversation with Dinesh and thought that was really cool. Also recently learned that you could download your facebook data, including messages which would provide a large dataset to train a model on!

## What it does

I-Reply will take the facebook data that you download and train a model to respond just like you. You could get your friends to try it out or even just have someone that you really know to talk with you.

## How we built it

Front-end:

- Built using react.js

Back-end: 

- Used python for data-cleaning and google cloud API for model training and data storage calls
- Used node.js to receive send API calls to the hosted model on GCP

AI:

- Used a seq2seq model built with Tensorflow to train and test our model
- Used GCP cloud storage to host our data and model weights as well as to provide infrastructure to 

## Challenges we ran into

We initially tried some chatbot library that we could train our data with very inexpensively but found the accuracy wasn't there. We stumbled upon a model type called seq2seq which was a deep learning approach to the problem we were trying to solve and that greatly improved the accuracy but we needed more infrastructure (GPUs) to train these models so GCP came in handy.

Time was not enough to do everything we wanted, we used an in memory database to store things and were not able to host it anywhere.

## Accomplishments that I'm proud of

We're proud of actually submitting something and persevering. But most of all we're proud of the friends we made a long the way, the chatbots.

## What I learned

Learned of new libraries and frameworks as well learned about how to use Google Cloud to create machine learning models with ease.

## What's next for I-Reply

- Use of other data like Whatsapp, Instagram or even Tinder!
- Actually hosting the website and services online instead of locally
- Integration with chat services like facebook messenger