#include <stdio.h>

int main() {
    int i;
    int credits[] = {4, 3, 3, 3, 3, 1, 2, 2};
    char *subjects[] = {
        "Discrete Mathematics",
        "Computer Architecture",
        "Automata",
        "DAA",
        "Biology",
        "EVS",
        "DAA Lab",
        "Computer Architecture Lab"
    };
    int totalCredits = 0, gradePoints[8];
    float sgpa, totalGradePoints = 0.0;


    printf("Enter grades (out of 10) for the following subjects:\n");
    for (i = 0; i < 8; i++) {
        printf("%s: ", subjects[i]);
        scanf("%d", &gradePoints[i]);
        totalGradePoints += gradePoints[i] * credits[i];
        totalCredits += credits[i];
    }


    sgpa = totalGradePoints / totalCredits;


    printf("\nTotal Credits: %d\n", totalCredits);
    printf("SGPA: %.2f\n", sgpa);

    return 0;
}

