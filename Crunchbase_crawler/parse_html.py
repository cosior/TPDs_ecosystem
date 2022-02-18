import os
from bs4 import BeautifulSoup
import pandas as pd

# The raw websites folder
path = "./Raw_Websites/"

# Get all websites files
files = os.listdir(path)

# To hold the final results
RESULTS = []

# Report the total number of websites that we are going to analyze.
print("Found {} html files...".format(len(files)))

# All possible information fields that crunchbase provides for each company.
def crete_entry():
    return {
        "Closed Date": "",
        "Investment Stage": "",
        "Number of Sub-Orgs": "",
        "Headquarters Regions": "",
        "Acquired by": "",
        "Hub Tags": "",
        "Money Raised at IPO": "",
        "Acquisitions": "",
        "Transaction Name": "",
        "Related Hubs": "",
        "Legal Name": "",
        "Accelerator Duration (in weeks)": "",
        "Announced Date": "",
        "Diversity Spotlight (US Only)": "",
        "Contacts": "",
        "Company Type": "",
        "Also Known As": "",
        "Employee Profiles": "",
        "Accelerator Application Deadline": "",
        "Stock Symbol": "",
        "Investor Type": "",
        "Operating Status": "",
        "Diversity Investments": "",
        "Founded Date": "",
        "Founders": "",
        "Contact Email": "",
        "Exits": "",
        "IPO Share Price": "",
        "Sub-Organization of": "",
        "IPO Date": "",
        "Accelerator Program Type": "",
        "Funds": "",
        "Number of Exits": "",
        "Price": "",
        "Investments": "",
        "Investors": "",
        "Last Funding Type": "",
        "Accelerator has Demo Days": "",
        "Valuation at IPO": "",
        "Total Funding Amount": "",
        "Industries": "",
        "Phone Number": "",
        "Sub-Organization": ""
    }

# Support functions - Start ##########################################################################################
def get_parent_a(tag):
    li = t.find_parent("li")
    a = li.find("a")
    return a['href'].split("/")[-1]

def get_sub_orgs(tag):
    tmp = t.find_parent("div", {"class": "section-content"})
    al = tmp.find_all("a", {"class": "link-accent"})[1:] # remove the first "a" since is towards the current domain
    orgs = []
    for a in al:
        orgs.append(a['href'].split("/")[-1].strip())
    return ", ".join(orgs)

def get_sub_org_of(tag):
    print(tag)
# Support functions - END ############################################################################################

# Main processing loop
for f in files:
    in_file = path + f
    e_name = f.split(".")[0]
    print(in_file, e_name)
    e = crete_entry()
    e["CB_name"] = e_name
    soup = BeautifulSoup(open(in_file, encoding='utf-8'), "html.parser")
    tmp = soup.findAll('label-with-info')

    for t in tmp:
        label = t.text.strip()
        try:
            all_t = t.find_parent("li")
            tmp = ' '.join(all_t.getText(separator=u' ').split())
            tmp = tmp.replace(" ,", ",")
            tmp = tmp.split(label)[1].strip()
            e[label] = tmp
            if label == "Acquired by":
                e[label] = get_parent_a(t)
            elif label == "Sub-Organization of":
                e[label] = get_parent_a(t)
        except:
            tmp = t.find_parent("div").text
            tmp = tmp.split(label)[1].strip()
            e[label] = tmp
            if label == "Number of Sub-Orgs":
                e["Sub-Organization"] = get_sub_orgs(t)

    RESULTS.append(e)

# Transform data into a pandas dataframe...
df = pd.DataFrame(RESULTS)
print(df.shape)

# ... and save them to a csv file.
df.to_csv("CB_RES.csv", sep="\t", index=False)