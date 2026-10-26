#!/usr/bin/env python3
"""Build Ramstad Reklame's 20s stock-footage commercial from licensed Pexels clips.
Only the ORIGINAL repo logo is used; no logo letters are recreated.
Source clips: Pexels, free commercial-use license (check before publication).
"""
from pathlib import Path
import subprocess, math, random, wave
from PIL import Image, ImageDraw, ImageFont
from collections import deque
from urllib.parse import urlparse

BASE=Path(__file__).resolve().parent.parent
WORK=BASE/"video_work"
OUT=BASE/"docs"/"media"/"ramstad-reklame-real-video-20s.mp4"
W,H,FPS=720,1280,25
FONT="/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
BOLD="/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
SOURCES=[
 ("https://videos.pexels.com/video-files/36604690/15520309_1920_1080_25fps.mp4","filmstudio",0),
 ("https://videos.pexels.com/video-files/29539460/12715672_1920_1080_30fps.mp4","photo",1),
 ("https://videos.pexels.com/video-files/1350205/1350205-hd_1920_1080_30fps.mp4","website",4),
 ("https://videos.pexels.com/video-files/33684362/14309360_1920_1080_25fps.mp4","camera",4)
]
COPY=[
 ("HVER IDÉ FORTJENER Å BLI SETT.","REKLAME · INNHOLD"),
 ("VI FANGER OPPMERKSOMHETEN.","FOTO · VIDEO"),
 ("VI SKAPER DIGITALT INNTRYKK.","NETTSIDER · DESIGN"),
 ("GJØR MERKEVAREN MINNEVERDIG.","STRATEGI · MARKEDSFØRING")
]

def run(args):
    print("$", " ".join(map(str,args)),flush=True)
    subprocess.run(list(map(str,args)),check=True)

def get_font(path,size):
    return ImageFont.truetype(path,size)

def cover_logo():
    logo_path=BASE/"ramstad-logo-official.png"
    if not logo_path.exists(): raise RuntimeError("Official logo absent; will not invent or replace brand mark")
    img=Image.open(logo_path).convert("RGBA")
    # Remove only contiguous near-white background connected to the outer image boundary.
    # Preserve interior white details of the approved mark.
    pix=img.load(); iw,ih=img.size
    if iw*ih>8_000_000:
        img.thumbnail((1600,1600));pix=img.load();iw,ih=img.size
    def paper(x,y):
        r,g,b,a=pix[x,y]
        return a>0 and min(r,g,b)>241 and max(r,g,b)-min(r,g,b)<12
    q=deque([(x,0) for x in range(iw)]+[(x,ih-1) for x in range(iw)]+
            [(0,y) for y in range(ih)]+[(iw-1,y) for y in range(ih)])
    seen=set()
    while q:
        x,y=q.popleft()
        if (x,y) in seen or not (0<=x<iw and 0<=y<ih):continue
        seen.add((x,y))
        if not paper(x,y):continue
        r,g,b,_=pix[x,y];pix[x,y]=(r,g,b,0)
        if x>0:q.append((x-1,y))
        if x+1<iw:q.append((x+1,y))
        if y>0:q.append((x,y-1))
        if y+1<ih:q.append((x,y+1))
    # Do not remove or redraw any pixels inside the logo.
    return img

def make_overlay(i,logo):
    im=Image.new("RGBA",(W,H),(0,0,0,0))
    p=im.load()
    for y in range(H):
        bottom=max(0,(y-500)/(H-500))
        top=max(0,1-y/270)
        a=int(min(190,145*(bottom**1.2)+58*top))
        if a:
            for x in range(W):
                p[x,y]=(3,13,30,a)
    d=ImageDraw.Draw(im)
    d.rounded_rectangle((49,104,58,174),radius=4,fill=(35,171,253,255))
    d.text((79,117),"RAMSTAD REKLAME",font=get_font(BOLD,26),fill=(255,255,255,255))
    d.rectangle((55,939,141,946),fill=(35,171,253,255))
    headline,sub=COPY[i]
    # All lines fit within 720px, with a crisp bold brand style.
    mainfont=get_font(BOLD,36 if len(headline)>29 else 40)
    max_width=W-110
    while d.textbbox((0,0),headline,font=mainfont)[2]>max_width:
        mainfont=get_font(BOLD,max(28,mainfont.size-1))
    d.text((54,982),headline,font=mainfont,fill=(255,255,255,255),stroke_width=0)
    d.text((57,1050),sub,font=get_font(BOLD,22),fill=(123,216,255,255))
    im.save(WORK/f"overlay{i}.png")

def make_outro(logo):
    im=Image.new("RGBA",(W,H),(4,19,44,255))
    d=ImageDraw.Draw(im)
    for i in range(18):
        c=(5+i*2,40+i*3,83+i*5,255)
        d.ellipse((300+i*12,-180+i*7,900+i*12,490+i*7),outline=c,width=2)
    d.rectangle((0,0,10,H),fill=(12,133,245,255))
    img=logo.copy()
    img.thumbnail((410,370),Image.Resampling.LANCZOS)
    if img.width>0 and img.height>0:
        im.alpha_composite(img,((W-img.width)//2,252))
    d=ImageDraw.Draw(im)
    head=get_font(BOLD,68)
    d.text((W//2,707),"BLI SETT.",font=head,anchor="mm",fill=(255,255,255,255))
    d.text((W//2,807),"BLI HUSKET.",font=head,anchor="mm",fill=(78,200,255,255))
    d.rounded_rectangle((118,920,602,991),radius=22,fill=(13,121,219,255))
    d.text((W//2,955),"ramstadreklame.no",font=get_font(BOLD,32),anchor="mm",fill=(255,255,255,255))
    d.text((W//2,1072),"REKLAME • NETTSIDER • FOTO • VIDEO",font=get_font(BOLD,17),anchor="mm",fill=(171,215,249,255))
    im.convert("RGB").save(WORK/"outro.png")

def music(path):
    random.seed(12)
    sr=44100;total=20*sr
    notes=[220,261.63,329.63,392.0,440,392,329.63,261.63]
    with wave.open(str(path),"wb") as w:
        w.setnchannels(1);w.setsampwidth(2);w.setframerate(sr)
        block=[]
        for n in range(total):
            t=n/sr
            beat=t*2.35; phase=beat%1.0
            kick=0.29*math.exp(-12*phase)*math.sin(2*math.pi*(70-20*phase)*t)
            melody_note=notes[int(t*2)%len(notes)]
            notephase=(t*2)%1.0
            arp=0.065*math.exp(-2*notephase)*math.sin(2*math.pi*melody_note*t)
            bass=0.09*math.sin(2*math.pi*(55 if int(beat)%4<2 else 65.4)*t)
            hat=0.028*(random.random()*2-1)*math.exp(-55*(beat*2%1))
            swell=0.023*math.sin(2*math.pi*0.15*t)*math.sin(2*math.pi*440*t)
            fade=min(1,t/0.45,(20-t)/1.0)
            val=max(-1,min(1,(kick+arp+bass+hat+swell)*max(0,fade)))
            block.append(int(val*32767).to_bytes(2,"little",signed=True))
            if len(block)>=8192:
                w.writeframes(b"".join(block));block.clear()
        if block:w.writeframes(b"".join(block))

def main():
    WORK.mkdir(parents=True,exist_ok=True)
    OUT.parent.mkdir(parents=True,exist_ok=True)
    logo=cover_logo()
    for i in range(4):make_overlay(i,logo)
    make_outro(logo)
    for i,(url,name,start) in enumerate(SOURCES):
        clip=WORK/(name+".mp4")
        if not clip.exists():
            run(["curl","-fL","--retry","3","--connect-timeout","20","--max-time","270",
                 "-A","Mozilla/5.0","-o",clip,url])
        run(["ffprobe","-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1",clip])
        # Render a 4-second cropped, shaded real-life video with a caption overlay.
        run(["ffmpeg","-y","-loglevel","error","-ss",start,"-t","4","-i",clip,
             "-loop","1","-i",WORK/f"overlay{i}.png",
             "-filter_complex",f"[0:v]fps={FPS},scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},eq=contrast=1.05:saturation=0.95,setsar=1[base];[base][1:v]overlay=0:0:shortest=1,format=yuv420p[v]",
             "-map","[v]","-t","4","-r",FPS,"-an","-c:v","libx264",
             "-preset","veryfast","-crf","20","-movflags","+faststart",WORK/f"scene{i}.mp4"])
    run(["ffmpeg","-y","-loglevel","error","-f","lavfi","-i",f"color=c=#04132c:s={W}x{H}:r={FPS}:d=4",
         "-loop","1","-i",WORK/"outro.png","-filter_complex","[0:v][1:v]overlay=0:0:shortest=1,format=yuv420p[v]",
         "-map","[v]","-t","4","-r",FPS,"-an","-c:v","libx264","-preset","veryfast","-crf","20",WORK/"scene4.mp4"])
    listing=WORK/"concat.txt"
    listing.write_text("".join(f"file '{(WORK/f'scene{i}.mp4').resolve()}'\n" for i in range(5)))
    run(["ffmpeg","-y","-loglevel","error","-f","concat","-safe","0","-i",listing,
         "-c","copy",WORK/"silent.mp4"])
    music(WORK/"music.wav")
    run(["ffmpeg","-y","-loglevel","error","-i",WORK/"silent.mp4","-i",WORK/"music.wav",
         "-map","0:v:0","-map","1:a:0","-c:v","copy","-c:a","aac","-b:a","160k",
         "-t","20","-movflags","+faststart",OUT])
    run(["ffprobe","-v","error","-show_entries","format=duration,size",
         "-of","default=noprint_wrappers=1",OUT])
    print("SUCCESS",OUT,OUT.stat().st_size,flush=True)

if __name__=="__main__":
    main()
