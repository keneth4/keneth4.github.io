"""Offline checks for the user-approved whole-object requirement; needs Pillow."""
import unittest
from pathlib import Path
from PIL import Image, ImageChops

ROOT = Path(__file__).resolve().parents[1] / 'docs/qa/cinematic-v3'

class PosterFraming(unittest.TestCase):
    def test_whole_object_master_is_lossless_and_clear_of_every_edge(self):
        source = Image.open(ROOT / 'poster-master.png').convert('RGBA')
        master = Image.open(ROOT / 'poster-master.webp').convert('RGBA')
        self.assertEqual(source.size, (2100, 2100))
        self.assertEqual(source.tobytes(), master.tobytes())
        alpha = source.getchannel('A')
        self.assertEqual(alpha.getpixel((0, 0)), 0)
        left, top, right, bottom = alpha.point(lambda value: 255 if value > 10 else 0).getbbox()
        self.assertGreater(min(left, top, 2100-right, 2100-bottom), 2100*.05)
        for size in (560, 1120):
            derivative = Path(__file__).resolve().parents[1] / f'assets/rework/mollequiles-{size}.webp'
            with Image.open(derivative) as image:
                self.assertEqual(image.size, (size, size))

    def test_poster_and_live_A_have_the_same_uncropped_projection(self):
        boxes = []
        for name in ('poster-at-A.png', 'rendered-A.png'):
            image = Image.open(ROOT / name).convert('RGB')
            background = Image.new('RGB', image.size, image.getpixel((0, 0)))
            mask = ImageChops.difference(image, background).convert('L').point(lambda value: 255 if value > 9 else 0)
            box = mask.getbbox()
            self.assertIsNotNone(box)
            self.assertGreater(min(box[0], box[1], image.width-box[2], image.height-box[3]), image.width*.04)
            boxes.append([value/image.width for value in box])
        self.assertLess(max(abs(a-b) for a, b in zip(*boxes)), .005)

if __name__ == '__main__':
    unittest.main()
