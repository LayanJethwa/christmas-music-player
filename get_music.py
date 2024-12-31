import os
from tinytag import TinyTag
import base64
import io
import PIL.Image as Image
import os.path

filenames = open("data/filenames.txt","w",encoding="utf-8")
titles = open("data/titles.txt","w",encoding="utf-8")
artists = open("data/artists.txt","w",encoding="utf-8")
images = open("data/images.txt","w",encoding="utf-8")

folder = 'christmas-music'
files = os.listdir(folder)
for f in range(len(files)):
    file = files[f]
    tag: TinyTag = TinyTag.get(f"{folder}/{file}",image=True)

    filenames.write(file)
    filenames.write('\n')
    titles.write(tag.title)
    titles.write('\n')
    artists.write(tag.artist)
    artists.write('\n')

    image = tag.images.any
    if image:
        if image.mime_type == 'image/jpeg':
            try:
                Image.open(io.BytesIO(image.data)).save('C:/Users/lrsje/OneDrive - The Loughborough Schools Foundation/Programming/Projects/Winter Drops/data/images/'+file[0:-3]+'jpg')
            except:
                images.write('0')
            else:
                if os.path.exists('C:/Users/lrsje/OneDrive - The Loughborough Schools Foundation/Programming/Projects/Winter Drops/data/images/'+file[0:-3]+'jpg'):
                    images.write('1')
                else:
                    images.write('0')

        elif image.mime_type == 'image/png':
            try:
                Image.open(io.BytesIO(image.data)).save('C:/Users/lrsje/OneDrive - The Loughborough Schools Foundation/Programming/Projects/Winter Drops/data/images/'+file[0:-3]+'png')
            except:
                images.write('0')
            else:
                if os.path.exists('C:/Users/lrsje/OneDrive - The Loughborough Schools Foundation/Programming/Projects/Winter Drops/data/images/'+file[0:-3]+'png'):
                    images.write('2')
                else:
                    images.write('0')
        
        else:
            images.write('0')
    else:
        images.write('0')
        
filenames.close()
titles.close()
artists.close()
images.close()