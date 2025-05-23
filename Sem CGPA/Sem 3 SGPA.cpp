#include <stdio.h>

int main() {
    // Declare variables
    int credits[] = {3, 3, 3, 2, 3, 2, 2, 2, 2}; // Credits for each subject
    char *subjects[] = {
        "Computer Organization",
        "DSA",
        "Analog and Digital Electronics",
        "Mathematics",
        "Economics",
        "Computer Organization Lab",
        "DSA Lab",
        "Analog and Digital Electronics Lab",
        "Python Lab"
    };
    int totalCredits = 0, gradePoints[9];
    float sgpa, totalGradePoints = 0.0;

    // Input grades for each subject
    printf("Enter grades (out of 10) for the following subjects:\n");
    for (int i = 0; i < 9; i++) {
        printf("%s: ", subjects[i]);
        scanf("%d", &gradePoints[i]);
        totalGradePoints += gradePoints[i] * credits[i];
        totalCredits += credits[i];
    }

    // Calculate SGPA
    sgpa = totalGradePoints / totalCredits;

    // Output the SGPA
    printf("\nTotal Credits: %d\n", totalCredits);
    printf("SGPA: %.2f\n", sgpa);

    return 0;
}

