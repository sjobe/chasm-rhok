README for chasm_test.exe
Liz Holcombe 22/06/10

Command line usage: chasm_test <steering file number>

where: <steering file number> is the two-digit steeringfile number such as 06 from 06.steering


Notes: 
1. works on MSWindows
2. uses CHASM functions for reading/checking steering file and input files
3. should pick up formatting errors in input files
4. prints out main parameters for developer to check against values input in web-interface
5. doesn't run CHASM simulations
6....therefore, doesn't pick up subtle errors in parameter values which would cause CHASM to crash
