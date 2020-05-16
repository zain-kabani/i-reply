import pandas as pd
import numpy as np
import os
import re
from datetime import datetime


def getFacebookData():
    personName = "Zain Kabani"
    responseDictionary = dict()
    allLines = []
    with open('fbMessages.txt', 'r') as fbFile:
        for line in fbFile:
            allLines.append(line.strip())

    myMessage, otherPersonsMessage, currentSpeaker = "","",""
    for index,lines in enumerate(allLines):
        rightBracket = lines.find(']') + 2
        justMessage = lines[rightBracket:]

        colon = justMessage.find(':')
        # Find messages that I sent
        if (justMessage[:colon] == personName):
            if not myMessage:
                # Want to find the first message that I send (if I send multiple
                # in a row)
                startMessageIndex = index - 1
            myMessage += justMessage[colon + 2:]

        elif myMessage:
            # Now go and see what message the other person sent by looking at
            # previous messages
            for counter in range(startMessageIndex, 0, -1):
                currentLine = allLines[counter]
                rightBracket = currentLine.find(']') + 2
                justMessage = currentLine[rightBracket:]
                colon = justMessage.find(':')
                if not currentSpeaker:
                    # The first speaker not named me
                    currentSpeaker = justMessage[:colon]
                elif (currentSpeaker != justMessage[:colon] and otherPersonsMessage):
                    # A different person started speaking, so now I know that the
                    # first person's message is done
                    otherPersonsMessage = cleanMessage(otherPersonsMessage)
                    myMessage = cleanMessage(myMessage)
                    responseDictionary[otherPersonsMessage] = myMessage
                    break
                otherPersonsMessage = justMessage[colon + 2:] + otherPersonsMessage
            myMessage, otherPersonsMessage, currentSpeaker = "","",""

    return responseDictionary

def cleanMessage(message):
    # Remove new lines within message
    cleanedMessage = message.replace('\n',' ').lower()
    # Deal with some weird tokens
    cleanedMessage = cleanedMessage.replace("\xc2\xa0", "")
    # Remove punctuation
    cleanedMessage = re.sub('([.,!?])','', cleanedMessage)
    # Remove multiple spaces in message
    cleanedMessage = re.sub(' +',' ', cleanedMessage)
    return clean_text(cleanedMessage)

def clean_text(text):
    '''Clean text by removing unnecessary characters and altering the format of words.'''

    text = text.lower()
    
    text = re.sub(r"i'm", "i am", text)
    text = re.sub(r"he's", "he is", text)
    text = re.sub(r"she's", "she is", text)
    text = re.sub(r"it's", "it is", text)
    text = re.sub(r"that's", "that is", text)
    text = re.sub(r"what's", "that is", text)
    text = re.sub(r"where's", "where is", text)
    text = re.sub(r"how's", "how is", text)
    text = re.sub(r"\'ll", " will", text)
    text = re.sub(r"\'ve", " have", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"\'d", " would", text)
    text = re.sub(r"\'re", " are", text)
    text = re.sub(r"won't", "will not", text)
    text = re.sub(r"can't", "cannot", text)
    text = re.sub(r"n't", " not", text)
    text = re.sub(r"n'", "ng", text)
    text = re.sub(r"'bout", "about", text)
    text = re.sub(r"'til", "until", text)
    text = re.sub(r"[-()\"#/@;:<>{}`+=~|.!?,]", "", text)
    
    return text


combinedDictionary = {}


print('Getting Facebook Data')
combinedDictionary.update(getFacebookData())

print('Total len of dictionary', len(combinedDictionary))

print('Saving conversation data dictionary')
np.save('conversationDictionary.npy', combinedDictionary)

conversationFile = open('conversationData.txt', 'w')
for key, value in combinedDictionary.items():
    if (not key.strip() or not value.strip()):
        # If there are empty strings
        continue
    conversationFile.write(key.strip() + value.strip())