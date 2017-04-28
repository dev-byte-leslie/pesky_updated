# Setup Project Name
projName="Pesky"

sed -i -- 's/Hakaan256/Daniel Hyning/g' gourcelog.txt
sed -i -- 's/Thomas Michael Rosik/Thomas Rosik/g' gourcelog.txt
sed -i -- 's/Alex/Alex Hill/g' gourcelog.txt
sed -i -- 's/murles29/Leslie Murles/g' gourcelog.txt

# Clean up the temporary files from sed
rm gourcelog.txt--
