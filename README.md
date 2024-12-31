
# Christmas Music Player

This is a Christmas website I made, that plays Christmas music to you!

It is written using pure (vanilla) HTML, CSS and JS.

*Created for Hack Club's Winter boba drops programme!*
## Demo
You can access the site here:
https://layanjethwa.github.io/christmas-music-player/


## Features

- Basic controls (play/pause, next/prev track)
- Toggle shuffle mode
- Dynamic seekbar, click to change position
- Pulls title, artist, duration, and album art from track metadata
    - Uses 1 of 9 default images for album art if not found


## Run Locally

Clone the project

```bash
  git clone https://github.com/LayanJethwa/christmas-music-player
```

Go to the project directory

```bash
  cd christmas-music-player
```
Start the server

```bash
  python -m http.server
```
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Then navigate to *localhost:8000*


## Adding music
- Upload your mp3 files to the christmas-music folder within the root directory  
  - **OR** create a new folder in the root directory with the music in, then on line **13** of the Python script, and line **19** of the JavaScript file, change *"christmas-music"* to your new folder name

- Install dependencies

  ```bash
  pip install tinytag
  pip install pillow
  ```

- Run the Python script (*get_music.py*)

  ```bash
  python -m get_music.py
  ```
## Changing default images
If you wish to change the default images displayed when album art is not found, edit the contents of the folder */data/images/default* as desired.

You will also need to edit the variable *default_len* to reflect the number of files in that folder; this can be found on line **17** of the JavaScript file.