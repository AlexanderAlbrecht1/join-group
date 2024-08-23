# join-group

#Anpassung der Ordnerstruktur

Nach dem Vorbild von Alexander habe ich die Ordner und Files entsprechend der Vorgabe weitergeführt. Fonts und general-style css sind in der index verlinkt. In jedem Ordner gibt es nochmal einen Sub-JS Ordner, sodass wenn wir template.js verwenden um Dinge auszulagern oder mehr unterteilen wollen, das in jedem Seitenpart können.

#Funktionalität Firebase hinzugefügt

PUT / GET für die angelegten Tasks funktioniert komplett. Nach dem Drop der Karten werden die Kategorien
ebenfalls aktualisiert und in Firebase gepusht sowie geladen. Folglich aktualisieren sich die Boards
aller Teilnehmer passend dem Datenbankstatus (Zentral). Die Funktionalität kann im folgenden auf alle Teilbereiche ausgeweitet werden.


Ideen
=======
- Auswahlbuttons für Deseihns
- eine Lock Funktion einbauen für Multiuserbetrieb (Gleichzeitige Nutzung auf die Firebase Tabelle)
