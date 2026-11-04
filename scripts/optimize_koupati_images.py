from pathlib import Path
from PIL import Image, ImageOps
import re, io
root=Path(".")
sources={
"10.png":1084,"11.png":1084,"12.png":1084,"2.jpg":1600,"3.jpg":1600,"4.jpg":1600,
"5.png":1084,"6.webp":1084,"7.webp":1280,"9.png":1084,"90513.webp":1536,
"images/koupati_logo.png":320,"koupati_logo.png":320,"tapash_photo.png":800
}
# A separate smaller hero source for narrow viewports; keep original assets intact.
hero_source=root/"7.webp"
with Image.open(hero_source) as original:
 mobile=ImageOps.exif_transpose(original)
 if mobile.mode not in ("RGB","RGBA"): mobile=mobile.convert("RGB")
 mobile.thumbnail((480,720),Image.Resampling.LANCZOS)
 mobile.save(root/"7-mobile.webp",format="WEBP",quality=74,method=6)
 print("mobile hero:",(root/"7-mobile.webp").stat().st_size)
dimensions={}
for name,maxdim in sources.items():
 p=root/name
 if not p.exists(): raise RuntimeError(f"Missing original: {name}")
 with Image.open(p) as original:
  im=ImageOps.exif_transpose(original)
  if im.mode not in ("RGB","RGBA"): im=im.convert("RGBA" if "A" in im.getbands() else "RGB")
  im.thumbnail((maxdim,maxdim),Image.Resampling.LANCZOS)
  target=p.with_name(p.stem+"-optimized.webp")
  im.save(target,format="WEBP",quality=78,method=6)
  dimensions[name]=(im.width,im.height)
  print(name,p.stat().st_size,"->",target,target.stat().st_size)
for p in root.glob("*.html"):
 original=p.read_text(encoding="utf-8")
 def transform(match):
  tag=match.group(0)
  src_match=re.search(r'\bsrc="([^"]+)"',tag)
  if not src_match: return tag
  src=src_match.group(1)
  if src in dimensions:
   target=str(Path(src).with_name(Path(src).stem+"-optimized.webp"))
   tag=tag.replace('src="'+src+'"','src="'+target+'"',1)
   w,h=dimensions[src]
  elif (root/src).is_file():
   try:
    with Image.open(root/src) as im: w,h=im.size
   except Exception: return tag
  else: return tag
  tag=re.sub(r'\swidth="[^"]*"', '',tag)
  tag=re.sub(r'\sheight="[^"]*"', '',tag)
  return tag[:-1]+f' width="{w}" height="{h}">'
 updated=re.sub(r'<img\b[^>]*>',transform,original)
 if updated!=original: p.write_text(updated,encoding="utf-8")
