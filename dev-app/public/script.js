// page elements
const home = document.getElementById("home");
const lifecycle = document.getElementById("lifecycle");
const linux = document.getElementById("linux");
const terminal = document.getElementById("terminal");

// ---------------- PAGE NAVIGATION ----------------
function hideAll() {
    home.classList.remove("active");
    lifecycle.classList.remove("active");
    linux.classList.remove("active");
}

function showLifecycle() {
    hideAll();
    lifecycle.classList.add("active");
}

function showLinux() {
    hideAll();
    linux.classList.add("active");
    loadCommands();
}

function goHome() {
    hideAll();
    home.classList.add("active");
}

// ---------------- LINUX COMMANDS ----------------
function loadCommands() {

    terminal.innerHTML = ""; // clear

    const commands = [
        "pwd - show current directory",
        "ls - list files",
        "ls -la - list hidden files",
        "cd /var/log - go to logs",
        "cd .. - move back",
        "mkdir project - create folder",
        "touch app.js - create file",
        "rm file.txt - delete file",
        "rm -rf folder - delete folder",
        "cp file1 file2 - copy",
        "mv old new - rename",
        "cat file.txt - view file",
        "nano file.txt - edit file",
        "head file.txt - first lines",
        "tail -f logs.txt - live logs",
        "top - cpu usage",
        "ps aux - running processes",
        "kill -9 PID - kill process",
        "df -h - disk usage",
        "free -m - memory usage",
        "chmod 777 file - permissions",
        "chown user:user file - ownership",
        "systemctl status nginx",
        "systemctl start nginx",
        "systemctl stop nginx",
        "journalctl -u nginx",
        "tar -cvf backup.tar folder",
        "tar -xvf backup.tar",
        "zip -r project.zip folder",
        "unzip project.zip"
    ];

    commands.forEach(cmd => {
        const line = document.createElement("div");
        line.className = "cmd";
        line.innerText = "devops@server:~$ " + cmd;
        terminal.appendChild(line);
    });
}
