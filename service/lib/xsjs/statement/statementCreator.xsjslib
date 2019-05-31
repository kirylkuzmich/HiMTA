var statementCreator = function () {
    function createInsertStatement(sTableName, oValueObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sColumnList = '', sValueList = '';

        oValueObject.forEach((value, key) => {
            sColumnList += `"${key}",`;
            sValueList += "?, ";

            result.aValues.push(value);
            result.aParams.push(key);
        });
        // Remove the last unnecessary comma and blank
        sColumnList = sColumnList.slice(0, -2);
        sValueList = sValueList.slice(0, -2);

        oResult.sql = `insert into "${tableName}" (${sColumnList}) values (${sValueList})`;

        $.trace.error("sql to insert: " + oResult.sql);
        return oResult;
    };

    function createDeleteStatement(sTableName, oConditionObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }
        // Remove the last unnecessary AND
        sWhereClause = sWhereClause.slice(0, -5);
        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `delete from "${sTableName}" ${sWhereClause}`;

        $.trace.error("sql to delete: " + oResult.sql);
        return oResult;
    };

    this.createUpdateStatement = function (sTableName, oConditionObject) {
        let oResult = {
            aParams: [],
            aValues: [],
            sql: "",
        };

        let sWhereClause = '';
        for (let key in oConditionObject) {
            sWhereClause += `"${key}"=? and `;
            oResult.aValues.push(oConditionObject[key]);
            oResult.aParams.push(key);
        }

        sWhereClause = sWhereClause.slice(0, -2);

        if (sWhereClause.length > 0) {
            sWhereClause = " where " + sWhereClause;
        }

        oResult.sql = `update "${sTableName}" ${sWhereClause}`; 

        $.trace.error("sql to update: " + oResult.sql);
        return oResult;
    };
}