# Project008-Calculator
This is a basic JS calculator. The credit goes to Mr.Elon during our JS course. I added a couple of extra functionality;
 - not to accept cansecutive operation sign,
 - added another button for back space. You can delete current operand and operation sign one-by-one. But there is a bug if I want to delete ( 66 + 25 ) it works fine until deleteing 2,5 and + sign. But not allowing the current operand to update.
 -decimal computation results are checked with a function and if the num is integer it shows accordingly : 8 / 2 = 4 (not 4.0000). but 5 / 3 = 1.6667 upto 4-digits.
 The size of the calculator is changed to fit t omobile screen. I chnaged the px values manually. There should be clever CSS method to fix the original size which was 840px x 600 px
