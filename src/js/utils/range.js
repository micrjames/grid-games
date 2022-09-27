const range = function *(start, end) {
    yield start;
    if(start == end) return;
    yield *range(start + 1, end);
};
const range_rev = function *(start, end) {
    yield start;
    if(start == end) return;
    yield *range(start - 1, end);
};

export { range, range_rev };
