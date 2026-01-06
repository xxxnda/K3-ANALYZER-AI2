from analyzer import k3_object_analyzer
import json

print("🧪 Testing Enhanced Object Insights\n")
print("=" * 60)

# Test with construction objects
objects = ['person', 'helmet', 'vest', 'excavator', 'ladder']
result = k3_object_analyzer(objects)

# Parse LLM response
llm_output = result['llm_analysis']
cleaned = llm_output.replace('```json', '').replace('```', '').strip()

try:
    data = json.loads(cleaned)
    
    print("\n✅ LLM Analysis SUCCESS!\n")
    
    # Show scene description
    print("📝 Scene Description:")
    print(f"   {data.get('scene_description', 'N/A')}\n")
    
    # Show object insights
    print("🔍 Object Insights:")
    print("-" * 60)
    for idx, obj in enumerate(data.get('object_insights', []), 1):
        print(f"\n{idx}. 🔹 {obj['object_name'].upper()}")
        print(f"   📌 Function: {obj['function']}")
        print(f"   🏷️  Category: {obj['safety_category']}")
        print(f"   ⚠️  Risk Level: {obj['risk_level']}")
        print(f"   💀 Potential Risks:")
        for risk in obj.get('potential_risks', [])[:2]:
            print(f"      - {risk}")
        print(f"   ✓ Proper Usage: {obj['proper_usage']}")
    
    # Show PPE compliance
    print("\n\n🛡️ PPE Compliance:")
    print("-" * 60)
    ppe = data.get('ppe_compliance', {})
    print(f"   Status: {ppe.get('status', 'N/A')}")
    print(f"   Present: {', '.join(ppe.get('present', []))}")
    print(f"   Missing: {', '.join(ppe.get('missing', []))}")
    
    # Show overall risk
    print(f"\n\n⚠️ Overall Risk Level: {data.get('risk_level', 'N/A')}")
    
    # Show top recommendations
    print("\n\n💡 Top Safety Recommendations:")
    print("-" * 60)
    for idx, rec in enumerate(data.get('safety_recommendations', [])[:3], 1):
        print(f"\n{idx}. [{rec.get('priority', 'N/A')}] {rec.get('recommendation', 'N/A')}")
        print(f"   Reason: {rec.get('reason', 'N/A')}")
    
    print("\n" + "=" * 60)
    print("✅ Test Complete!")
    
except json.JSONDecodeError as e:
    print(f"❌ JSON Parse Error: {e}")
    print(f"\nRaw output:\n{llm_output[:500]}...")
