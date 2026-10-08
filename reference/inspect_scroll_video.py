import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".video-tools"))

import av
from PIL import Image, ImageDraw

source = Path(r"C:\Users\sahib\Downloads\Video-93859.mp4")
output = Path(__file__).with_name("flatbar-scroll-reference-contact.jpg")
container = av.open(str(source))
stream = container.streams.video[0]
duration = float(stream.duration * stream.time_base) if stream.duration else float(container.duration / av.time_base)
print(f"duration={duration:.2f}s size={stream.width}x{stream.height} fps={float(stream.average_rate):.2f}")

count = 12
targets = [duration * i / (count - 1) for i in range(count)]
frames = []
next_target = 0
for frame in container.decode(stream):
    if next_target >= count:
        break
    timestamp = float(frame.time or 0)
    if timestamp + 0.01 < targets[next_target]:
        continue
    frames.append((timestamp, frame.to_image()))
    next_target += 1

cell_w, cell_h, label_h = 400, 225, 26
sheet = Image.new("RGB", (cell_w * 3, (cell_h + label_h) * 4), "#111111")
draw = ImageDraw.Draw(sheet)
for index, (timestamp, image) in enumerate(frames):
    x = (index % 3) * cell_w
    y = (index // 3) * (cell_h + label_h)
    display = image.copy()
    display.thumbnail((cell_w, cell_h))
    sheet.paste(display, (x, y + label_h))
    draw.text((x + 8, y + 5), f"{timestamp:.1f}s", fill="white")
    if index in (0, 1, 3, 5, 7, 9):
        frames[index][1].save(Path(__file__).with_name(f"scroll-full-{index:02d}.jpg"), quality=94)
        crop = frames[index][1].crop((0, 300, 720, 940))
        crop.save(Path(__file__).with_name(f"scroll-frame-{index:02d}.jpg"), quality=94)
sheet.save(output, quality=91)
print(output)
