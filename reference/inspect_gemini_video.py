import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".video-tools"))

import av
from PIL import Image, ImageDraw

source = Path(r"C:\Users\sahib\Downloads\Steel_flat_bar_product_animation_20261005234320.mp4")
output = Path(__file__).with_name("flatbar-gemini-contact.jpg")
container = av.open(str(source))
stream = container.streams.video[0]
duration = float(stream.duration * stream.time_base) if stream.duration else float(container.duration / av.time_base)
print(f"duration={duration:.2f}s size={stream.width}x{stream.height} fps={float(stream.average_rate):.2f}")

count = 20
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

cell_w, cell_h, label_h = 480, 270, 28
sheet = Image.new("RGB", (cell_w * 4, (cell_h + label_h) * 5), "#111111")
draw = ImageDraw.Draw(sheet)
for index, (timestamp, image) in enumerate(frames):
    x = (index % 4) * cell_w
    y = (index // 4) * (cell_h + label_h)
    display = image.copy()
    display.thumbnail((cell_w, cell_h))
    sheet.paste(display, (x, y + label_h))
    draw.text((x + 8, y + 5), f"{timestamp:.2f}s", fill="white")
    if index in (0, 2, 4, 6, 8, 10, 12, 14, 16, 18):
        image.save(Path(__file__).with_name(f"gemini-full-{index:02d}.jpg"), quality=92)
sheet.save(output, quality=90)
print(output)
