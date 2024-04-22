import { getMonth } from "./index";
/**
 * @function getMonth
 */

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("the function return janvier for 2022-01-01 as date", () => {
      expect(getMonth(new Date("2022-01-01"))).toBe("janvier");
    });
    it("the function return juillet for 2022-07-08 as date", () => {
      expect(getMonth(new Date("2022-07-08"))).toBe("juillet");
    });
  });
});
/* Les tests ont été implémentés. Ils vérifient si la fonction 'getMonths' retourne le bon mois pour les dates données */
