describe("Java line counter", function () {
 
    it("should count \n", function () {
        var input = "ABC\nABC\n\ABC";
        expect(countLines(input)).toBe(3);
    });

    it("should count \r", function () {
        var input = "ABC\rABC";
        expect(countLines(input)).toBe(2);
    });

    it("should not count blank lines", function () {
        var input = "\n\r\n";
        expect(countLines(input)).toBe(0);
    });

    it("should not count whitespace and tab", function () {
        var input = "  \nABC\n\t\n ";
        expect(countLines(input)).toBe(1);
    });

    it("should not count inline comments", function () {
        var input = "//inline comment\nABC\nABC";
        expect(countLines(input)).toBe(2);
    });    

    it("should ignore inline comments that are not at start of line", function () {
        var input = "A//inline comment\nABC\nABC";
        expect(countLines(input)).toBe(3);
    });  

    it("should ignore multiple inline comments", function () {
        var input = "/*COMMENT*//*COMMENT*/";
        expect(countLines(input)).toBe(0);
    });  

    it("should not count new lines inside comments", function () {
        var input = "Hello/*COMMENT\nCOMMENT\nCOMMENT*/";
        expect(countLines(input)).toBe(1);
    });  


});

describe("Remove comments", function () {
    it("should strip comments", function () {
        var input = '123/*COMMENT \n COMMENT*/123/*COMMENT*/';
        expect(removeComments(input)).toBe('123123');
    });    

    it("should strip nested comments", function () {
        var input = '123/*/**/123/****/*/';
        expect(removeComments(input)).toBe('123123*/');
    }); 

    it("should ignore /* inside double quotes", function () {
        var input = 'System./*wait*/out./*for*/println/*it*/("Hello/*");';
        expect(removeComments(input)).toBe('System.out.println("Hello/*");');
    });

    it("should ignore double quotes that are inside comments", function () {
        var input = 'System./*wait"*/out./*""for*/println/*it*/("Hello/*");';
        expect(removeComments(input)).toBe('System.out.println("Hello/*");');
    }); 

});  
