let originalData = null;

window.onload = async function () {
  try {
    const res = await fetch("data.json");
    const data = await res.json();
    originalData = data;

    document.getElementById("contact-phone").textContent = data.contact.phone;
    document.getElementById("contact-email").textContent = data.contact.email;
    document.getElementById("contact-address").textContent = data.contact.address;
    document.getElementById("contact-website").textContent = data.contact.website;

    const educationList = document.getElementById("educationList");
    data.education.forEach(edu => {
      const p = document.createElement("p");
      p.textContent = edu;
      educationList.appendChild(p);
    });

    const skillsList = document.getElementById("skillsList");
    data.skills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    const langList = document.getElementById("languagesList");
    data.languages.forEach(lang => {
      const li = document.createElement("li");
      li.textContent = lang;
      langList.appendChild(li);
    });

    document.getElementById("profile-description").value =
      localStorage.getItem("profile") || data.profile;

    const workExp = document.getElementById("workExperience");
    data.workExperience.forEach(work => {
      const p = document.createElement("p");
      p.textContent = work;
      workExp.appendChild(p);
    });

    document.getElementById("reference-1").textContent = data.references[0];
    document.getElementById("reference-2").textContent = data.references[1];

    document.getElementById("name").value = localStorage.getItem("name") || "";
    document.getElementById("email").value = localStorage.getItem("email") || "";
    document.getElementById("date").value = localStorage.getItem("date") || "";
  } catch (err) {
    alert("Data yüklənərkən xəta baş verdi.");
    console.error(err);
  }
};

function addEducation() {
  const newEdu = document.getElementById("newEducation").value.trim();
  if (!newEdu) {
    document.getElementById("educationError").textContent =
      "Zəhmət olmasa bir təhsil məlumatı daxil edin.";
    return;
  }
  const p = document.createElement("p");
  p.textContent = newEdu;
  document.getElementById("educationList").appendChild(p);
  document.getElementById("newEducation").value = "";
  document.getElementById("educationError").textContent = "";
}

function addSkill() {
  const newSkill = document.getElementById("newSkill").value.trim();
  if (!newSkill) {
    document.getElementById("skillError").textContent =
      "Zəhmət olmasa bir bacarıq daxil edin.";
    return;
  }
  const li = document.createElement("li");
  li.textContent = newSkill;
  document.getElementById("skillsList").appendChild(li);
  document.getElementById("newSkill").value = "";
  document.getElementById("skillError").textContent = "";
}

function addWork() {
  const newWork = document.getElementById("newWork").value.trim();
  if (!newWork) {
    document.getElementById("workError").textContent =
      "Zəhmət olmasa bir iş təcrübəsi daxil edin.";
    return;
  }
  const p = document.createElement("p");
  p.textContent = newWork;
  document.getElementById("workExperience").appendChild(p);
  document.getElementById("newWork").value = "";
  document.getElementById("workError").textContent = "";
}

function toggleSection(id) {
  const section = document.getElementById(id);
  section.style.display = section.style.display === "none" ? "block" : "none";
}

function saveToLocalStorage() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const date = document.getElementById("date").value;
  const profile = document.getElementById("profile-description").value.trim();

  let isValid = true;
  if (!name) {
    document.getElementById("nameError").textContent = "Ad tələb olunur.";
    isValid = false;
  } else document.getElementById("nameError").textContent = "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Etibarlı e-poçt daxil edin.";
    isValid = false;
  } else document.getElementById("emailError").textContent = "";

  if (!date) {
    document.getElementById("dateError").textContent = "Tarix tələb olunur.";
    isValid = false;
  } else document.getElementById("dateError").textContent = "";

  if (profile.length < 10) {
    document.getElementById("profileError").textContent =
      "Profil təsviri minimum 10 simvol olmalıdır.";
    isValid = false;
  } else document.getElementById("profileError").textContent = "";

  if (!isValid) return;

  localStorage.setItem("name", name);
  localStorage.setItem("email", email);
  localStorage.setItem("date", date);
  localStorage.setItem("profile", profile);

  alert("Məlumatlar yadda saxlanıldı!");
}

function resetToOriginal() {
  if (!originalData) return;

  localStorage.clear();
  location.reload();
}