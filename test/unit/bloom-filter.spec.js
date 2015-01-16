describe("Bloom filter", function () {

	beforeEach(function() {
		initArray(100000);
	});

    it("should not contain anything initially", function () {
        expect(check("test")).toBe(false);
    });

    it("should find an added word", function () {
    	add("test");
    	add("word");
        expect(check("test")).toBe(true);
        expect(check("word")).toBe(true);

        expect(check("otherword")).toBe(false);
    });



});