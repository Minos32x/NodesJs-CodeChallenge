#! /usr/bin/node

const fs = require('fs');
const path = require('path');
const commander = require('commander');
const chalk = require('chalk');
array = [];


commander.option('add', 'add key value ');
commander.option('list', 'list file content');
commander.option('get', 'get file content according to specifc key');
commander.option('remove', 'remove specific content according to given key');
commander.option('clear', 'clear file content');
commander.parse(process.argv);

if (commander.list) {
    fs.readFile(path.resolve(__dirname, 'Study List'), function (err, res) {

        if (res.length > 1) {
            var line = res.toString();
            console.log(line);
        } else {
            console.log('File is empty')
        }
    });
    fs.close

} else if (commander.add) {
    fs.readFile(path.resolve(__dirname, 'Study List'), function (err, res) {
        if (res.length > 1) {
            line = res.toString();
            var key = process.argv.slice(3)[0]
            var value = process.argv.slice(4)[0]
            if (key == null || value == null) {
                console.log("Empty key or value re check data")
                if (key == null) {
                    console.log('Unidentified Key')
                } else {
                    console.log('Unidentified Value')
                }
            } else {
                var DataObject = {
                    [key]: value
                }
                var OldData = JSON.parse(line)
                OldData.push(DataObject)
                Store = JSON.stringify(OldData)

                fs.writeFile(path.resolve(__dirname, 'Study List'), Store, function (err, res) {});
                console.log('Saved Succesfully')
            }

        } else {
            var key = process.argv.slice(3)[0]
            var value = process.argv.slice(4)[0]
            var DataObject = {
                [key]: value
            }
            var array = [DataObject];
            var Store = JSON.stringify(array);
            fs.writeFile(path.resolve(__dirname, 'Study List'), Store, function (err, res) {});
        }
    });
    fs.close

} else if (commander.get) {
    fs.readFile(path.resolve(__dirname, 'Study List'), function (err, res) {
        var key = process.argv.slice(3)[0];
        var line = res.toString();
            data = JSON.parse(line);
       if(res.length<1){
           console.log("File is empty")
       }
            else if (key == null) {
            console.log("Key is missing !")
        } else {
            for (i = 0; i < data.length; i++) {
                if (key == Object.keys(data[i])) {
                    console.log(data[i])
                    break
                } else {
                    console.log('Data not found')
                }
            }
        }
        

    });


} else if (commander.remove) {
    fs.readFile(path.resolve(__dirname, 'Study List'), function (err, res) {
        var key = process.argv.slice(3)[0];
        var line = res.toString();
        data = JSON.parse(line); 
        for (i = 0; i < data.length; i++) {
          
            if (key == Object.keys(data[i])) {
                index=data.indexOf(data[i]);
                console.log(index);
                data.splice(index,1)
                break
            }
        }
        Store=JSON.stringify(data)
        if (Store.length>0){
        fs.writeFile(path.resolve(__dirname, 'Study List'), Store, function (err, res) {});}
        else{
            fs.writeFile(path.resolve(__dirname, 'Study List'), '', function (err, res) {});

        }

    });


} else if (commander.clear) {
    fs.writeFile(path.resolve(__dirname, 'Study List'), '', function (err, res) {});

} else {
    console.log('Enter Correct Option');
}