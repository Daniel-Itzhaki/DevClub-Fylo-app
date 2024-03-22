const fileInput = document.getElementById('fileInput');
const progress = document.querySelector('.gradient-bar');

fileInput.addEventListener('change', selectFile);

const MBUnit = 1024 * 1024;
const maxSize = 10;

let uploadedFiles = JSON.parse(localStorage.getItem('uploadedFiles') || '[]');

displayFiles(uploadedFiles);
updateStorageDisplay();

function openFileExp() {
    fileInput.click();
}

function selectFile() {
    const filePattern = /\.(jpg|jpeg|png|gif)$/;

    let files = fileInput.files;
    for (let i = 0; i < files.length; i++) {
        if (filePattern.test(files[i].name)) {
            if (fileInput.files[0].size > maxSize * MBUnit) {
                alert("File size is to BIG. 10MB or lower!")
                return;
            }
            else
                uploadedFiles.push({
                    name: files[i].name,
                    size: files[i].size,
                    type: files[i].type
                });
        }

        else {
            alert("Please select valid image files.");
            return;
        }
    }

    localStorage.setItem('uploadedFiles', JSON.stringify(uploadedFiles));

    displayFiles(uploadedFiles);
    checkStorageSize();
}

function checkStorageSize() {
    let totalSize = 0;
    uploadedFiles.forEach(file => {
        totalSize += file.size;
    });

    if (totalSize > maxSize * MBUnit) {
        alert("no more space");
        return;
    }

    updateStorageDisplay(totalSize);
}


function updateStorageDisplay(totalSize = 0) {
    if (totalSize == 0) {
        uploadedFiles.forEach(file => totalSize += file.size);
    }

    const MBRemaining = (totalSize / MBUnit).toFixed(2);
    document.getElementById('spaceUsed').textContent = MBRemaining + ' MB';

    const spaceLeft = (maxSize - MBRemaining).toFixed(2);
    document.getElementById('spaceLeft').textContent = spaceLeft + ' MB left';

    UpdateGradientBar(MBRemaining);
}


function UpdateGradientBar(MBRemaining) {
    let gradientBarPercent = (MBRemaining / maxSize) * 100;
    progress.style.width = `${gradientBarPercent}%`;

}

function displayFiles(files) {
    const fileList = document.getElementById('fileList');

    fileList.innerHTML = '';
    files.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file.name + ' - ' + (file.size / MBUnit).toFixed(2) + ' MB';
        fileList.appendChild(listItem);

    });
}

function clearStorage() {
    localStorage.removeItem('uploadedFiles');
    uploadedFiles = [];

    document.getElementById('fileList').innerHTML = '';
    updateStorageDisplay();
}

checkStorageSize();
