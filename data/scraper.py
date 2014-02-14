import urllib
from bs4 import BeautifulSoup
import re
import codecs

basePortraitUrl = 'http://www.wikipaintings.org/en/paintings-by-genre/self-portrait/'
baseUrl = "http://www.wikipaintings.org"
portraits = []

def scrapePage(pagenum):
    print "scraping page " + str(pagenum)
    soup = BeautifulSoup(urllib.urlopen(basePortraitUrl+str(pagenum)))
    listContainer = soup.find_all("div", id="listContainer")[0]
    divs = listContainer.find_all(id=re.compile("^a"));
    for div in divs:
        name = div.find(class_="tt16").find("a").string
        links = [a['href'] for a in div.find(class_="search-row").find_all("a")]
        infoUrl = baseUrl + a['href']
        infoSoup = BeautifulSoup(urllib.urlopen(infoUrl)) 
        p = {}
        infoDiv = infoSoup.find("div", class_="DataProfileBox")
        if infoDiv is None:
            continue
        for b in infoDiv.find_all("b"):
            if b.string == "Artist:":
                p["Artist"] = b.next_sibling.next_sibling.string
            elif b.string == "Style:":
                p["Style"] = b.next_sibling.next_sibling.string
            elif b.string == "Completion Date:":
                p["Date"] = b.find_next_siblings("span")[0].string
        if "Date" not in p:
            p["Date"] = "-1"
        if "Style" not in p:
            p["Style"] = "Unknown"
        p["ImgUrl"] = infoSoup.find("a", id="paintingImage")['href']
        p["Url"] = infoUrl
        print p
        portraits.append(p)

for i in range(41, 53):
    scrapePage(i)
artist_out = codecs.open('artist_out', 'w', "utf-8")
style_out = codecs.open('style_out', 'w', "utf-8")
date_out = codecs.open('date_out', 'w', "utf-8")
imageurl_out = codecs.open('imgeurl_out', 'w', "utf-8")
url_out = codecs.open('url_out', 'w', "utf-8")
for p in portraits:
    artist_out.write(p["Artist"]+"\n")
    style_out.write(p["Style"]+"\n")
    date_out.write(p["Date"]+"\n")
    imageurl_out.write(p["ImgUrl"]+"\n")
    url_out.write(p["Url"]+"\n")
artist_out.close()
style_out.close()
date_out.close()
imageurl_out.close()
url_out.close()
