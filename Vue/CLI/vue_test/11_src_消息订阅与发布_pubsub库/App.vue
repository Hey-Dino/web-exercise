<template>
    <div>
        <School></School>
        <hr>
        <Student></Student>
    </div>
</template>

<script>
import School from "./components/School";
import Student from "./components/Student";

export default {
    name: "App",
    data() {
        return {
            waitTime: 3000,
        };
    },
    components: {
        School,
        Student,
    },
};
</script>