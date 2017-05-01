# Setup Project Name
projName="Pesky - Source Code"

sed -i -- 's/Hakaan256/Daniel Hying/g' gourcelog.txt
sed -i -- 's/Thomas Michael Rosik/Thomas Rosik/g' gourcelog.txt
sed -i -- 's/Alex/Alex Hill/g' gourcelog.txt
sed -i -- 's/murles29/Leslie Murphy/g' gourcelog.txt

# Clean up the temporary files from sed
rm gourcelog.txt--
