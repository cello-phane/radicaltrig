tsc $1 --skipLibCheck
input_file=$1
output_file=${input_file%.ts}.js
# https://stackoverflow.com/questions/7573368/in-place-edits-with-sed-on-os-x
# NOTE: Strips export statements, as I do not get tsc to not emit them
#       and finally want to move on with things
sed -i '' '/exports.*/d' $output_file