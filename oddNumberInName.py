#Within your first and last names, insert the last 8 digits of the odd numbers you have created in the reverse order in between each letter. i.e. L39u37x35P33M31s29o27f25t
firstName = input("Enter you First Name : ")
lastName = input("Enter your Last Name : ") 
fullName = firstName + lastName
print(fullName)      

#looping to create a list of odd numbers
num = 40
even_List = []
odd_List = []
for i in range(0, num):
    if (i % 2 == 0):
        even_List.append(i)
    else:
        odd_List.append(i)

#reversing and truncating the odd_List
odd_List.reverse()
new= odd_List[:8]

# creating and printing the list with odd number after each letter of name
l=[]
for i , x in zip(fullName, new):
    l.append(i)
    l.append(x)
    
print(l)
        