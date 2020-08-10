#! /bin/bash
# exit when any command fails
set -e
read -p "Enter DETECTIFY KEY: " DETECTIFY_KEY
read -p "Enter BUG_CROWD: " BUG_CROWD

for i in $DETECTIFY_KEY $BUG_CROWD
do
echo -e ${i}

aws secretsmanager create-secret --name secrets/${i}_TEST --description "test" --secret-string $i
done

# echo -e "detectify"
# aws secretsmanager create-secret --name secrets/${DETECTIFY_KEY}_TEST --description "test" --secret-string $DETECTIFY_KEY
# echo -e "bug crowd"
# aws secretsmanager create-secret --name secrets/${BUG_CROWD_TEST}_TEST --description "test bug crowd" --secret-string $BUG_CROWD
