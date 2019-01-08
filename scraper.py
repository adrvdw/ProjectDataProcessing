#!/usr/bin/env python
# Name: Ad Ruigrok van der Werve
# Student number: 11323760

import pandas as pd
import numpy as np
import json

INPUT_CSV = "data.csv"
input = pd.read_csv(INPUT_CSV)
# list = []


date = "date"
price = "price(USD)"


input = input.replace("unknown", np.NaN)


input[price] = input[price].astype(float)
list = input[price].tolist()
input = input[[date, price]]


cleaned_gdp_list = [x for x in list if str(x) != 'nan']
print(cleaned_gdp_list)

j = input.set_index('Date').to_json("input.json", orient='index')
