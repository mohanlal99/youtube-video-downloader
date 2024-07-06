from pytube import YouTube

def download_video(url):
    try:
        yt = YouTube(url)
        video = yt.streams.get_highest_resolution()
        print(f"Downloading... {video.title}")
        video.download()  # Downloads to the current working directory
        print("Download completed!")
        return True
    except Exception as e:
        print(f"An error occurred: {e}")
        return False
