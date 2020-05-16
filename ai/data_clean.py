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

    all_messages = []

    for convo in convos:
        
        convo_base = base  + "/" + convo + "/"

        message_files = sorted(glob.glob(convo_base + "message_*.json"))
        
        for message_file in reversed(message_files):
            
            f = open(message_file)
            data = json.load(f)
            if len(data["participants"]) == 2:

                if len(data["messages"]) > 5:

                    for message in reversed(data["messages"]):
                        if "content" in message:
                            message_obj = {
                                "sender": message["sender_name"],
                                "content": clean_text(message["content"].replace('\n',' '))
                            }

                            all_messages.append(message_obj)

            f.close()        




    i = 0
    dest = open("fbMessages.txt", "w")
    while i < len(all_messages):
        sender = all_messages[i]["sender"]
        curr_message = all_messages[i]["content"]
        while i+1 < len(all_messages) and all_messages[i+1]["sender"] == sender:
            i += 1
            curr_message += " " + all_messages[i]["content"]
        dest.write(sender + ": " + curr_message + "\n")
        i += 1
    
    dest.close()


if __name__ == "__main__":
    cleanup("data/messages")
