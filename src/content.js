/*
    Script that contains all the scraping logic
*/

let gradesData = [];

onload = () => {
    console.log("[ECALC] Loaded.");
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.data == "fetch") {
            if (!location.href.includes("/znamky")) {
                sendResponse({ data: false });
                return;
            }
            try {
                scrapeGradeData();
                sendResponse({ data: gradesData });
            }catch(e){
                sendResponse({ data: false });
                return;
            }
        }
    }
);

function scrapeGradeData() {
    const table = document.querySelector("table");

    const tableRows = table.querySelectorAll("tr:not(.header)"); // Select all rows of that table EXCEPT the header

    gradeId = 0;
    gradesData = [];
    let subjectBuffer = {};
    for (const row of tableRows) {
        if (row.classList.contains("predmetRow")) {
            // Flush the previous buffer if there is anything
            if (Object.keys(subjectBuffer).length > 0) {
                if (subjectBuffer.grades.length > 0) {
                    subjectBuffer.grades.reverse();
                    gradesData.push(subjectBuffer);
                    subjectBuffer = {};
                }
            }

            let subjectName = row.querySelector("td > b").innerHTML;

            if (subjectName.includes("<")) { // If there is any trace HTML left, remove it
                subjectName = subjectName.split("<")[0];
            }

            subjectBuffer = {
                name: subjectName,
                grades: []
            };
        } else if (row.classList.contains("udalostRow")) {
            const gradeElements = [].slice.call(row.querySelectorAll(".znZnamka")).reverse(); //  .reverse() since it will be reversed later again

            const rowNoteBElement = row.querySelector("td:nth-child(1) div b");

            const rowTitle = row.querySelector("td:nth-child(1)").textContent.split(":")[0];

            let rowWeight = 1;

            if (rowNoteBElement) {
                const rowNoteB = rowNoteBElement.innerHTML;

                if (rowNoteB.includes("×")) {
                    rowWeight = parseFloat(rowNoteB.slice(0, -1));
                }
            }

            for (const gradeElement of gradeElements) {
                let grade = gradeElement.innerHTML;
                let finalGrade = gradeElement.querySelector(".znamkaVyhodnotenie"); // When there is smth like 3.25 / 5 -> (3)


                if (finalGrade) {
                    if (grade.includes("/")) {
                        grade = grade.split("/")[0] + ".5";
                    }

                    subjectBuffer.grades.push({
                        gradeId,
                        type: "grade",
                        grade: parseFloat(finalGrade.innerHTML),
                        weight: rowWeight,
                        title: rowTitle,
                        og: {
                            grade: parseFloat(finalGrade.innerHTML),
                            weight: rowWeight
                        }
                    });
                } else if (grade.includes(" / ")) {
                    const reached = parseFloat(grade.split("/")[0]);
                    const total = parseFloat(grade.split("/")[1]);

                    subjectBuffer.grades.push({
                        gradeId,
                        type: "points",
                        reached,
                        total,
                        weight: rowWeight,
                        title: rowTitle,
                        og: {
                            reached,
                            total,
                            weight: rowWeight,
                        }
                    });
                } else {
                    if (grade.includes("/")) {
                        grade = grade.split("/")[0] + ".5";
                    }

                    subjectBuffer.grades.push({
                        gradeId,
                        type: "grade",
                        grade: parseFloat(grade),
                        weight: rowWeight,
                        title: rowTitle,
                        og: {
                            grade: parseFloat(grade),
                            weight: rowWeight
                        }
                    });
                }

                gradeId++;
            }

        } else {
            console.warn("[ECALC] Fucc");
        }
    }

    console.log(gradesData);
}