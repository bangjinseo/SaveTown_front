// DOM Elements
const navButtons = document.querySelectorAll(".nav-btn")
const contentAreas = document.querySelectorAll(".content-area")
const newProjectLink = document.querySelector(".new-project-link")
const projectList = document.querySelector(".project-list")
const dashboardGrid = document.getElementById("dashboard-grid")
const dashboardSidebar = document.getElementById("dashboard-sidebar")
const projectSidebar = document.getElementById("project-sidebar")
const backToDashboardBtn = document.getElementById("back-to-dashboard")
const projectTitle = document.getElementById("project-title")

const PROJECT_STORAGE_KEY = "savetown_projects"

function showContent(targetId) {
    contentAreas.forEach((area) => area.classList.add("hidden"))
    const targetContent = document.getElementById(targetId)
    if (targetContent) targetContent.classList.remove("hidden")
    navButtons.forEach((btn) => btn.classList.remove("active"))
}

function showDashboard() {
    showContent("dashboard-content")
    document.getElementById("dashboard-btn").classList.add("active")
    dashboardSidebar.classList.remove("hidden")
    projectSidebar.classList.add("hidden")
}

function showProjectDetail(title) {
    showContent("project-detail-content")
    document.getElementById("dashboard-btn").classList.add("active")
    dashboardSidebar.classList.add("hidden")
    projectSidebar.classList.remove("hidden")
    projectTitle.textContent = title
}

// Navigation event listeners
document.getElementById("dashboard-btn").addEventListener("click", showDashboard)

document.getElementById("account-btn").addEventListener("click", () => {
    showContent("account-content")
    document.getElementById("account-btn").classList.add("active")
    dashboardSidebar.classList.remove("hidden")
    projectSidebar.classList.add("hidden")
})

document.getElementById("student-btn").addEventListener("click", () => {
    showContent("student-content")
    document.getElementById("student-btn").classList.add("active")
    dashboardSidebar.classList.remove("hidden")
    projectSidebar.classList.add("hidden")
})

// Back to dashboard button
backToDashboardBtn.addEventListener("click", showDashboard)

// Project management functions
function loadProjects() {
    const stored = localStorage.getItem(PROJECT_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
}

function saveProjects(projects) {
    localStorage.setItem(PROJECT_STORAGE_KEY, JSON.stringify(projects))
}

function addSidebarItem(title) {
    const li = document.createElement("li")
    const link = document.createElement("a")
    link.href = "#"
    link.className = "project-link"
    link.textContent = title
    link.addEventListener("click", (e) => {
        e.preventDefault()
        document.querySelectorAll(".project-link").forEach((l) => l.classList.remove("active-project"))
        link.classList.add("active-project")
        showProjectDetail(title)
    })
    li.appendChild(link)
    projectList.insertBefore(li, newProjectLink.parentElement)
}

function addDashboardCard(title) {
    const card = document.createElement("div")
    card.className = "dashboard-card"

    const cardTitle = document.createElement("h3")
    cardTitle.className = "card-title"
    cardTitle.textContent = title

    card.appendChild(cardTitle)
    card.addEventListener("click", () => {
        showProjectDetail(title)
    })

    dashboardGrid.appendChild(card)
}

// New project creation
newProjectLink.addEventListener("click", (e) => {
    e.preventDefault()
    const title = prompt("새 프로젝트 이름을 입력하세요:")
    if (!title || !title.trim()) return alert("제목은 비워둘 수 없습니다.")

    const projects = loadProjects()
    if (projects.includes(title.trim())) return alert("이미 존재하는 프로젝트입니다.")

    projects.push(title.trim())
    saveProjects(projects)
    addSidebarItem(title.trim())
    addDashboardCard(title.trim())
})

// Menu link interactions
const menuLinks = document.querySelectorAll(".menu-link")
menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        menuLinks.forEach((l) => l.classList.remove("active"))
        link.classList.add("active")

        // Here you can add functionality to show different content based on menu selection
        console.log(`${link.textContent} 메뉴 선택됨`)
    })
})

// Initialize page
document.addEventListener("DOMContentLoaded", () => {
    showDashboard()

    const savedProjects = loadProjects()
    savedProjects.forEach((title) => {
        addSidebarItem(title)
        addDashboardCard(title)
    })

    // Add some default projects if none exist
    if (savedProjects.length === 0) {
        const defaultProjects = ["프로젝트 1", "프로젝트 2", "프로젝트 3"]
        defaultProjects.forEach((title) => {
            addSidebarItem(title)
            addDashboardCard(title)
        })
        saveProjects(defaultProjects)
    }
})

// Add styles for active project links
const style = document.createElement("style")
style.textContent = `
    .project-link.active-project {
        background-color: #e8f5e8;
        color: #317A18;
        font-weight: 500;
    }
`
document.head.appendChild(style)
