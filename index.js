const fileInput = document.getElementById('fileInput');
const progress = document.querySelector('.gradient-bar');

fileInput.addEventListener('change', selectFile);

var uploadedFiles = [];

function openFileExp() {
    fileInput.click();
}

function selectFile() {
    const filePattern1 = /jpg$/;
    const filePattern2 = /jpeg$/;
    const filePattern3 = /png$/;
    const filePattern4 = /gif$/;

    var files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        if (!filePattern1.test(files[i].type) && !filePattern2.test(files[i].type) &&
            !filePattern3.test(files[i].type) && !filePattern4.test(files[i].type)) {
            alert("Please select valid image files.");
            return;
        }

        else if (fileInput.files[0].size > 10 * 1024 * 1024) {
            alert("File size is to BIG. 10MB or lower!")
            return;
        }

        uploadedFiles.push(files[i]);
    }

    let totalSize = 0;
    for (let i = 0; i < uploadedFiles.length; i++) {
        totalSize += uploadedFiles[i].size;
        if (totalSize > 10 * (1024 * 1024)) {
            alert("no more space");
            return;
        }
    }

    const MBSize = (totalSize / (1024 * 1024)).toFixed(2);
    document.getElementById('spaceUsed').textContent = MBSize + ' MB';

    const spaceLeft = (10 - MBSize).toFixed(2);
    document.getElementById('spaceLeft').textContent = spaceLeft + ' MB left';

    let gradientBarPercent = (MBSize / 10) * 100;
    progress.style.width = `${gradientBarPercent}%`
    displayFiles(uploadedFiles);
}

function displayFiles(files) {
    const fileList = document.getElementById('fileList');

    fileList.innerHTML = '';
    files.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name + ' - ' + (file.size / (1024 * 1024)).toFixed(2) + ' MB';
        fileList.appendChild(listItem);
    });
}

