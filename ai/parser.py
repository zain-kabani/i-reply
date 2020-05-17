import torch
from torch.jit import script, trace
import torch.nn as nn
from torch import optim
import torch.nn.functional as F
import csv
import random
import re
import os
import unicodedata
import codecs
from io import open
import itertools
import math

USE_CUDE = torch.cuda.is_available()
device = torch.device("cuda" if USE_CUDE else "cpu")

corpus_name = "cornell_movie_dialog_data"
corpus = os.path.join("", corpus_name)

all_lines = []
user_dict = {}
# L1045 +++$+++ u0 +++$+++ m0 +++$+++ BIANCA +++$+++ They do not!
def readFacebookData(file, n=100):
    with open(file, "r") as datafile:
        lines = datafile.readlines()

    counter = 0
    for line in lines:
        prefix = "L" + str(counter)
        message_tokens = line.split(":")
        # print(message_tokens[0])
        # print(message_tokens[1])

        sender = message_tokens[0]
        message = message_tokens[1]
        user_id = ""
        if(sender not in user_dict):
            dict_size = len(user_dict.keys())
            new_id = "u" + str(dict_size)
            user_dict[sender] = new_id
            user_id = new_id
        else:
            user_id = user_dict.get(sender)

        all_lines.append(prefix + " +++$+++ " + user_id +
                         " +++$+++ " + sender + " +++$+++ " + message)

        counter += 1


def printLines(file, n=100):
    with open(file, 'rb') as datafile:
        lines = datafile.readlines()
    for line in lines[:n]:
        print(line)

printLines(os.path.join(corpus, "movie_lines.txt"))

readFacebookData("fbMessages.txt")

with open('message_data', "w") as f:
    for item in all_lines:
        f.write(str(item))




if __name__ == "__main__":
    print("")



