#Create a python script that generates the first 20 even numbers from 0.

num = int(input("Enter the Number Till Where you want to print the Even Numbers : "))
even_List = []
for i in range(0, num):
    if (i % 2 == 0):
        even_List.append(i)

print(even_List)
