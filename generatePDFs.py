import subprocess
import os, fnmatch

markdown_files = []

# Get list of markdown files
listOfFiles = os.listdir(os.path.abspath("vimwiki/Markdown_files"))
pattern = "*.md" 
for entry in listOfFiles:  
    if fnmatch.fnmatch(entry, pattern):
            markdown_files.append(entry.replace(".md",""))

#Iterate through all markdown files
for file in markdown_files:
    mdFile = os.path.abspath("vimwiki/Markdown_files/" + file + ".md")
    htmlFile = os.path.abspath("vimwiki/temp_files/" + file + ".html")
    pdfFile = os.path.abspath("vimwiki/PDF_files/" + file + ".pdf")
    subprocess.run(["grip", mdFile, "--export", htmlFile])
    subprocess.run(["wkhtmltopdf", htmlFile, pdfFile])
    subprocess.run(["rm", htmlFile])
