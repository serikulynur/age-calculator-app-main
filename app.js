document.addEventListener('DOMContentLoaded', function() {
    const calculateButton = document.querySelector('button');
    const dayInput = document.querySelector('input[placeholder="DD"]');
    const monthInput = document.querySelector('input[placeholder="MM"]');
    const yearInput = document.querySelector('input[placeholder="YYYY"]');
    const ageYears = document.querySelector('.output-container p:nth-child(1) span');
    const ageMonths = document.querySelector('.output-container p:nth-child(2) span');
    const ageDays = document.querySelector('.output-container p:nth-child(3) span');

    calculateButton.addEventListener('click', function(event) {
        event.preventDefault();

        // Clear previous errors and results
        document.querySelectorAll('.error-message').forEach(el => el.classList.add('hidden'));
        ageYears.textContent = '--';
        ageMonths.textContent = '--';
        ageDays.textContent = '--';

        // Input values
        const day = parseInt(dayInput.value, 10);
        const month = parseInt(monthInput.value, 10);
        const year = parseInt(yearInput.value, 10);

        // Validation
        let hasError = false;
        if (!day || day < 1 || day > 31) {
            document.querySelector('.day-invalid').classList.remove('hidden');
            hasError = true;
        }
        if (!month || month < 1 || month > 12) {
            document.querySelector('.month').classList.remove('hidden');
            hasError = true;
        }
        if (!year) {
            document.querySelector('.year-required').classList.remove('hidden');
            hasError = true;
        }

        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        if (birthDate > today || isNaN(birthDate.getTime())) {
            document.querySelector('.date-invalid').classList.remove('hidden');
            hasError = true;
        }

        if (!hasError) {
            const age = getAge(birthDate, today);
            animateValue(ageYears, 0, age.years, 1000);
            animateValue(ageMonths, 0, age.months, 1000);
            animateValue(ageDays, 0, age.days, 1000);
        }
    });

    function getAge(birthDate, today) {
        let years = today.getFullYear() - birthDate.getFullYear();
        let months = today.getMonth() - birthDate.getMonth();
        let days = today.getDate() - birthDate.getDate();

        if (days < 0) {
            months--;
            days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        return { years, months, days };
    }

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
