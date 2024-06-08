import os
import random
import numpy as np
from PIL import Image,ImageColor
import json 

dir = "C://Users//Andrea//Desktop//Bracelet"
folder = dir+"//Img//Mini_14//"
pathimg = folder+'112230.gif' #'112094.gif'

def getFileList():
    fileList = []
    for file in os.listdir(folder):
        fileList.append(folder+file)
    return fileList

def loadImg(pathSample):
    img = Image.open(pathSample)#.crop((0,0,300,40))
    w, h = [int(img.size[0]/4),int(img.size[1]/4)]
    img = img.resize((w, h), Image.Resampling.LANCZOS)
    # Numpy Array
    imgArray = np.array(img.convert("RGB"))
    # Make it RGB
    arrayRgb = []
    for row in imgArray:
        rowValue = []
        for rgb in row:
            value = '#%02x%02x%02x' % (rgb[0], rgb[1], rgb[2])
            rowValue.append(value)
        arrayRgb.append(rowValue)
        
    return json.dumps(arrayRgb)

def arrayToImg(array):
    imgArr = []
    for row in array:
        rowValue = []
        for hex in row:
            rgb = ImageColor.getcolor(hex, "RGB")
            rowValue.append(rgb)
        imgArr.append(rowValue)
    img = Image.fromarray(imgArr)
    return img