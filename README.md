Proposed usage:

qsv -p "./path/to/my/file.csv"

OR

gsv -p "./path/to/my/file.csv" --headers

Options:

-p --path
-d --delimiter
-m --man
-h --headers

-> switch into interactive mode

V1 -> Array of Array of Array of Values
[
  [[colum1], [column2], [column3]],
  [[colum1], [column2], [column3]],
]

vs

V2 -> Array of Array of Values
[
  [colum1, column2, column3],
  [colum1, column2, column3],
]

vs

V3 -> Array of Objects
[
  {
    column1: column1,
    column2: column2,
    column3: column3,
  },
  {
    column1: column1,
    column2: column2,
    column3: column3,
  },
]