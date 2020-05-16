import os, shutil, json, glob, re

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

def cleanup(folder):
    print(folder)
    try:
        shutil.rmtree(folder + "/stickers_used")
    except:
        print("Stickers folder does not exist")
    
    try:
        shutil.rmtree(folder + "/message_requests")
    except:
        print("Message requests folder does not exist")
    
    try:
        shutil.rmtree(folder + "/archived_threads")
    except:
        print("Archived threads folder does not exist")
    

    base = folder + "/inbox"
    convos = os.listdir(base)

    dest = open("fbMessages.txt", "w")
    for convo in convos:
        
        convo_base = base  + "/" + convo + "/"

        message_files = sorted(glob.glob(convo_base + "message_*.json"))
        
        for message_file in reversed(message_files):
            
            f = open(message_file)
            data = json.load(f)
            if len(data["participants"]) < 3:

                if len(data["messages"]) > 5:

                    for message in reversed(data["messages"]):
                        if "content" in message:
                            message_str = "[" + str(message["timestamp_ms"]) + "] "
                            message_str += message["sender_name"] + ": "
                            message_str += clean_text(message["content"].replace('\n',' ')) + "\n"
                            dest.write(message_str)
            f.close()


    dest.close()
        

    


if __name__ == "__main__":
    cleanup("data/messages")
