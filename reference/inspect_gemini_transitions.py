import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / ".video-tools"))

import av
from PIL import Image, ImageDraw

source = Path(r"C:\Users\sahib\Downloads\Steel_flat_bar_product_animation_20261005234320.mp4")
folder = Path(__file__).parent
targets = [round(2.0 + i * .2, 2) for i in range(13)] + [round(6.3 + i * .2, 2) for i in range(12)]
container = av.open(str(source))
stream = container.streams.video[0]
frames = []
next_target = 0
for frame in container.decode(stream):
    if next_target >= len(targets):
        break
    timestamp = float(frame.time or 0)
    if timestamp + 0.01 < targets[next_target]:
        continue
    frames.append((timestamp, frame.to_image()))
    next_target += 1

cell_w, cell_h, label_h = 480, 270, 27
for title, selected in (("enter", frames[:13]), ("exit", frames[13:])):
    sheet = Image.new("RGB", (cell_w * 4, (cell_h + label_h) * 4), "#111")
    draw = ImageDraw.Draw(sheet)
    for i, (timestamp, frame) in enumerate(selected):
        x, y = i % 4 * cell_w, i // 4 * (cell_h + label_h)
        frame.thumbnail((cell_w, cell_h))
        sheet.paste(frame, (x, y + label_h))
        draw.text((x + 9, y + 5), f"{timestamp:.2f}s", fill="white")
    path = folder / f"flatbar-gemini-{title}-contact.jpg"
    sheet.save(path, quality=90)
    print(path)
