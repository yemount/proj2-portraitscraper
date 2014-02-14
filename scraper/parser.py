def writeToFile(list, f):
    f.write("[")
    for l in list:
        f.write(l + ", ")
    f.write("]\n")

artists = []
af = open('data/artist_out')
artists = [line.split("\n")[0] for line in af.readlines()]
af.close
afout = open('artist_out', 'w')
writeToFile(artists, afout)
afout.close

dates = []
df = open('data/date_out')
dates = [line.split("\n")[0] for line in df.readlines()]
df.close
dfout = open('date_out', 'w')
writeToFile(dates, dfout)
dfout.close

imgUrls = []
iuf = open('data/imgeurl_out')
imgUrls = [line.split("\n")[0] for line in iuf.readlines()]
iuf.close
iufout = open('imageurl_out', 'w')
writeToFile(imgUrls, iufout)
iufout.close

urls = []
uf = open('data/url_out')
urls = [line.split("\n")[0] for line in uf.readlines()]
uf.close
ufout = open('url_out', 'w')
writeToFile(urls, ufout)
ufout.close

styles = []
sf = open('data/style_out')
styles = [line.split("\n")[0] for line in sf.readlines()]
sf.close
sfout = open('style_out', 'w')
writeToFile(styles, sfout)
sfout.close

print len(artists)
print len(dates)
print len(styles)
print len(imgUrls)
print len(urls)
